import { supabase } from '@/lib/supabase'

export const fetchProjects = async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  return data || []
}

export const fetchCertificates = async () => {
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  return data || []
}

export const fetchTechStacks = async () => {
  const { data } = await supabase
    .from('tech_stack')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  return data || []
}