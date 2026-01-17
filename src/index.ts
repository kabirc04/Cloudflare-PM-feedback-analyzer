export interface Env {
	DB: D1Database;
	AI: Ai;
  }
  
  export default {
	async fetch(request: Request, env: Env): Promise<Response> {
	  try {
		const url = new URL(request.url);
		const text = url.searchParams.get('text');
  
		if (!text) {
		  return new Response(
			JSON.stringify({ error: 'Missing text parameter' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		  );
		}
  
		// Use Llama 3 to categorize the feedback
		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
		  messages: [
			{
			  role: 'system',
			  content: 'You are a feedback classifier. Categorize the following feedback as exactly one of: Bug, Praise, or Feature. Respond with only the category name, nothing else.'
			},
			{
			  role: 'user',
			  content: text
			}
		  ]
		});
  
		// Extract category from AI response
		const category = (aiResponse.response || '').trim();
  
		// Validate category
		const validCategories = ['Bug', 'Praise', 'Feature'];
		const finalCategory = validCategories.includes(category) ? category : 'Feature';
  
		// Save to D1 database
		await env.DB.prepare(
		  'INSERT INTO feedback (message, category) VALUES (?, ?)'
		)
		  .bind(text, finalCategory)
		  .run();
  
		return new Response(
		  JSON.stringify({
			success: true,
			message: 'Feedback analyzed and saved',
			category: finalCategory
		  }),
		  { status: 200, headers: { 'Content-Type': 'application/json' } }
		);
  
	  } catch (error) {
		return new Response(
		  JSON.stringify({
			error: 'Internal server error',
			details: error instanceof Error ? error.message : 'Unknown error'
		  }),
		  { status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	  }
	}
  };
