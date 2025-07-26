import supabase from "./supabase";

export async function showTodos(user_id) {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function addTask(user_id, title) {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        title: title,
        user_id: user_id,
      },
    ])
    .select();

  if (error) {
    return { success: false, error: error.message };
  } else {
    return { success: true, data: data[0] };
  }
}

export async function editTask(id, newTitle) {
  const { data, error } = await supabase
    .from("todos")
    .update({ title: newTitle, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function toggleComplete(id, currentStatus) {
  const { data, error } = await supabase
    .from("todos")
    .update({ completed: !currentStatus })
    .eq("id", id)
    .select();

  if (error) return { success: false, error: error.message };
  else {
    return { success: true, data };
  }
}

export async function deleteTask(id) {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  else {
    return { success: true, data };
  }
}
