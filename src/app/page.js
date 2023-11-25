import { TweetCard } from "@/components/TweetCard";
import { TweetInput } from "@/components/TweetInput";

async function getTweet() {
  const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='melfirasyahnazz@gmail.com')", {cache: "no-store", next: {
    tags: ["posts"]
  }});
  const data = await res.json();
return data;
}

export default async function Page() {
  const {items} = await getTweet()
  items.sort((a, b) => new Date(b.created) - new Date(a.created));

  return (
   
      <div className="mx-auto max-w-2xl p-4 border-x-2 border-gray-500">
        <div>
          <div className="relative h-36 bg-gray-800 m-y-20">
          <img
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
            src="https://via.placeholder.com/150"
            alt="Profile" width={128} height={128}/>  
        </div> 
        </div>
        

        <main >
          <div className='Username-bio pt-20'>
          <h1 className="text-2xl font-bold">Melfira Syahnaz</h1>
          <p className="text-gray-600">@prettyjacccc</p>
        </div>
        <div className="bio py-4">
          <p className=" text-gray-00">This is my assignment for week 4 (Twitter-clone) </p>
        </div>

        <div className='folls flex space-x-6 py-6 '>
          <div className='flex space-x-1'>
            <h4 className='font-bold'>111</h4>
            <p className='text-gray-600 '>Following</p>
          </div>

          <div className='flex space-x-1'>
          <h4 className='font-bold'>15</h4>
          <p className='text-gray-600'>Followers</p>
          </div>
        </div>

        </main>

        <section className="mt-8">
          
          <TweetInput/>

         <div >
          <span className="text-lg font-semibold pb-2 border-4 border-transparent border-b-sky-600 ">Recent Tweets</span>
        </div> 

        <div className="space-y-3">
        {items.map(({ id, content, created }) => {
          return <TweetCard key={id} id={id} content={content} created={created}/>;
        })}
      </div>

        
      
        </section>

      </div>
  )
}
