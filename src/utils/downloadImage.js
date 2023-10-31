// const post = {}

// import { useState, useEffect } from "react";
// import { supabase } from "../features/supabaseClient";

// const [photoUrl, setPhotoUrl] = useState(null)

// useEffect(() => {
//     let photo_url = post.photoUrl;
//     if (photo_url) downloadImage(photo_url)
// }, [post.photoUrl])

// async function downloadImage(path) {
//     try {
//         const {data, error} = await supabase.storage.from('things').download(path)
//         if (error){
//             throw error
//         }
//         const url = URL.createObjectURL(data)
//         setPhotoUrl(url)
//     } catch(error) {
//         console.log('Error downloading image: ', error.message)
//     }
// }