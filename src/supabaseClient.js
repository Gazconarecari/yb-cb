// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmquetroyeohmbkcmiyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcXVldHJveWVvaG1ia2NtaXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4OTExMTgsImV4cCI6MjA0NDQ2NzExOH0.27ZHQFV56J1VUnz091vrdKTHJH9QYZ5gFg3__yzlHzg';  // API Key de tu Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, { realtime: { disabled: true } });