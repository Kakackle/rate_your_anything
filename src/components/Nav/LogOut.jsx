import { supabase } from "../../features/supabaseClient";

export default function LogOut(){
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        console.log(error);
    }
    return(
        <>
        <h3>Sign out?</h3>
        <button onClick={signOut}>Sign out</button>
        </>
    )
}