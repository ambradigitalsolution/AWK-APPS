const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sklirqfmqqwbitpnywnm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbGlycWZtcXF3Yml0cG55d25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0Njk0NzUsImV4cCI6MjA4OTA0NTQ3NX0.N4cmFJwdYTYILJz_-Xbzc8h4DLutwJcpcdROLP-U0zs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const users = [
    { email: 'admin_ambra@mail.com', password: 'admin123', role: 'owner', name: 'Admin Ambra' },
    { email: 'mitra_ambra@mail.com', password: 'mitra123', role: 'mitra', name: 'Mitra Ambra' }
  ];

  for (const user of users) {
    console.log(`Checking ${user.email}...`);
    
    // Try sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          full_name: user.name,
          role: user.role
        }
      }
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log(`- ${user.email} is already registered in Auth.`);
      } else {
        console.error(`- Error registering ${user.email}:`, signUpError.message);
        continue;
      }
    } else {
      console.log(`- Success! ${user.email} registered.`);
    }

    // Note: Profiles and Organizations will be created upon first SUCCESSFUL login 
    // because AuthForm handles that if they don't exist.
    // However, for that to work, the user needs to confirm their email if verification is on.
  }
}

seed();
