const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Upsert to keep only latest submission
    const { error } = await supabase
      .from('rolematch_results')
      .upsert({
        student_id: data.studentId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        submitted_at: data.submittedAt,
        roles: data.roles
      }, { 
        onConflict: 'student_id' 
      });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};