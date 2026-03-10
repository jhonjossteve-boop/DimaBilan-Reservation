import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://zcoxiyxkixtgeklktrvv.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJkOGZmMTg1LTRhY2MtNDFhMi04ZGE4LWIwYzFiOWMzYTFlYyJ9.eyJwcm9qZWN0SWQiOiJ6Y294aXl4a2l4dGdla2xrdHJ2diIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzczMTIyMzYwLCJleHAiOjIwODg0ODIzNjAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.unPR1MpUD9iPcl51Gyf5ysC4IHuJtqYqJrjdpHdmCLc';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };