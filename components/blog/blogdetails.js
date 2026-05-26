import { useEffect, useState } from 'react'
import Image from 'next/image' 

import Blog1 from '../../public/images/pros3.png' 
import { Backicon, Faceicon, Instaicon, Linkicon, Shareicon, Xicon, Youicon } from '../common/svgicon'
import moment from 'moment';
import Link from 'next/link';



 

const BlogDetailsitems = ({data}) => {
const [copied, setCopied] = useState(null)
    const now = moment(data?.published_on).format('Do MMMM YYYY');

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 800); 
       
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

    // const handleShare = () => {
         
    
    //     if (navigator.share) {
    //       navigator
    //         .share({
    //           title: data?.title,
    //           url: window.location.href,
    //           text: data?.meta_description,
    //         })
        
    //     } else {
    //       copyToClipboard(window.location.href);
    //     }
    //   };
    
      const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
      };
   
  
  return (
     <section className='blog_details_sec pt-[50px] pb-[50px]'>
        <div className='container'  >

            <div className='flex items-center justify-between mb-[25px]'>
                <Link href="/blog" className='back_btn flex items-center gap-[10px]'> <Backicon/> All Blogs  </Link>
          <div>
            
          {copied && (
            <div className='py-[4px] px-[8px] bg-gray-500 text-[10px] rounded-[6px] mb-2'>
              Copied!
            </div>
          )}
                <div className='share_btn flex items-center gap-[10px] relative cursor-pointer' onClick={handleShare}>
                    Share <Shareicon/>
          </div>
</div>
            </div>

            

        <Image src={data?.featured_image?.file_path} alt='' width={1000} height={350} />
        
        <div className='pt-[25px]'>


            <h2> {data?.title} </h2> 

            <span> {now}</span>


            {data?.content?.map((items, index) =>(

                <div key={index}>
                    <h2 >   {items?.title} </h2>
                   
                    <div dangerouslySetInnerHTML={{__html:items?.description}} />  
                </div>

            ))}

           
          
          
           
     
        </div>


        <div className='author-sec flex flex-col md:flex-row items-center gap-[25px]'>

          <Image src={data?.published_by?.featured_image?.file_path} alt='' width={1000} height={350} />

          <div>
            <h5><Link href={`/author/${data?.published_by?.slug}`}>  {data?.published_by?.name} </Link> </h5>
            <h3> {data?.published_by?.designation}</h3>
            <p> {data?.published_by?.short_description}</p>
            <div className='flex items-center gap-[15px]'>
              {data?.published_by?.['facebook_link'] && 
                <a href={data?.published_by?.facebook_link} target='_blank'><Faceicon/></a>
              }
              {data?.published_by?.['instagram_link'] && 
              <a href={data?.published_by?.instagram_link} target='_blank'> <Instaicon/></a>
              }
              {data?.published_by?.['twitter_link'] && 
                            <a href={data?.published_by?.twitter_link} target='_blank'> <Xicon/> </a>
              }
              {data?.published_by?.['youtube_link'] && 
                            <a href={data?.published_by?.youtube_link} target='_blank'><Youicon/></a>
              }
              {data?.published_by?.['linkedin_link'] && 
                            <a href={data?.published_by?.linkedin_link} target='_blank'><Linkicon/></a>
              }

            </div>

          </div>






        </div>

        </div>
         
     </section>
  )
}

export default BlogDetailsitems
