import "server-only";
import { createSupabaseServer } from "./supabase/server";

export const fetchProjectsCount = async() => {
  try{
    const supabase = await createSupabaseServer();

    const { count, error } = await supabase.from("projects").select("*", { count: "exact", head: true });

    if(error) throw new Error('Failed to fetch projects count');

    return count;
  }
  catch(err: any){
    console.log(err.message);
    return 0;
  }
}

export const fetchProjects = async() => {
  try{
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from("projects").select("id, title, github_link, description, image_url, owner, created_at").order("created_at", {ascending: false});

    if(error) throw new Error(error.message);

    return data; 
  }
  catch(err: any){
    console.log(err.message);
    return []; 
  }
}

