import styled from "styled-components";
import { supabase } from "../../features/supabaseClient";

export default function UploadImage({photoUrl, setPhotoUrl, photoLoading,
     setPhotoLoading, session, newPhoto, setNewPhoto}){

    async function getImg(path){
        try{
            // const { data, error : uploadError } = await supabase.storage.from('things').upload(filePath, file)
            // const { photo_url, photo_error } = await supabase.storage.from('things').download(path);
            const { data } = await supabase
            .storage
            .from('things')
            .createSignedUrl(path, 60*60*60*60)
            
            // const url = URL.createObjectURL(photo_url)
            setPhotoUrl(data.signedUrl);
            console.log('photo_url: ', data);

        } catch(error){
            console.log(error);
        } finally {
            setPhotoLoading(false);
            setNewPhoto(null);
        }

    }

    async function uploadImage(event){
        setPhotoLoading(true);
        try {
            
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            setNewPhoto(file);
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { data, error : uploadError } = await supabase.storage.from('things').upload(filePath, file)
            // console.log('upload data:');
            // console.log(path);
            const path = data.path;

            if (uploadError) {
                throw uploadError
            }

            else {
                await getImg(path);
                // const {photo_data, photo_error} = await supabase.storage.from('things').download()
            }

        } catch (error) {
            console.log(error.message)
        } finally {
            // setUploading(false)
        }
    }

    return (
        <>
            <label htmlFor="photo">Photo</label>
            <input type="file" name="photo" accept=".jpg, .JPG, .png, .PNG"
            onChange={uploadImage}></input>
            {
                photoUrl ? <UploadedImg src={photoUrl}></UploadedImg>
                : ""
            }
        </>
    )
}

const UploadedImg = styled.img`
max-width: 400px;
max-height: 400px;
object-fit: contain;
width: 100%;
height: 100%;`