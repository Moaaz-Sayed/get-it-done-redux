import supabase from "./supabase";

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    hasSession: !!data.session,
    user: data.user,
  };
}

export async function signup({ username, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    user: data.user,
    hasSession: !!data.session,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
  };
}
