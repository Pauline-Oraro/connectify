import { useState, type ChangeEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { supabase } from "../supabase-client";

interface PostInput {
    title: string;
    content: string;
}


const createPost = async (post: PostInput, imageFile:File) => {
    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

    const {error: uploadError} = await supabase.storage.from('posts-images').upload(filePath, imageFile)

    if(uploadError){
        throw new Error(uploadError.message);
    }

    const {data: publicURLData} = supabase.storage.from('posts-images').getPublicUrl(filePath);

    const {data, error} = await supabase.from('posts').insert({...post, image_url: publicURLData.publicUrl})

    if(error){
        console.error("Insert error:", error.message);
        throw new Error(error.message);
    }

    return data;
}


const CreatePost = () => {
    const [title, setTitle] = useState<string>("")

    const [content, setContent] = useState<string>("")

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate, isPending, isError} = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });
    
    

    {/**handle submit */}
    const handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        if(!selectedFile) return;
        mutate({post: {title, content}, imageFile: selectedFile});
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0]);
        }
    }


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
            <label htmlFor="title">TITLE:</label>
            <input 
            type="text" 
            id="title"  
            required 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-white/10 bg-transparent p-2 rounded"
            />
        </div>

        <div>
            <label htmlFor="content">CONTENT:</label>
            <textarea 
            id="content" 
            required 
            rows={5} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-white/10 bg-transparent p-2 rounded"
            ></textarea>
        </div>

        <div>
            <label htmlFor="image" className="block mb-2 font-medium">UPLOAD IMAGE:</label>
            <input type="file"
            id="image" 
            accept="image/*"
            required
            className="w-full text-gray-200"
            onChange={handleFileChange}
            />
        </div>

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">{isPending ? "Creating..." : "Create Post"}</button>

        {isError && <p className="text-red-500"> Error creating post.</p>}
    </form>
  )
}

export default CreatePost
