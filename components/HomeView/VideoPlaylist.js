import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoPlaySharp } from "react-icons/io5";
import YoutubeServices from '../Services/YoutubeServices';
import parseISO8601Duration from '../../utils/parseISO8601Duration';

export default function VideoPlayer({VideoListsData}) {

  const [videoMetadata, setVideoMetadata] = useState([]);
  const [videoPlaying, setVideoPlaying] = useState();


  useEffect(() => {
    async function fetchVideoData() {
      const metadata = [];
      for (let i = 0; i < VideoListsData.length; i++) {
        const id = VideoListsData[i];
        const videoMetadata = await YoutubeServices.getVideoInfoFromId(id.videoplaylist.videoid);

        
        // Format duration in ISO8601 to MM:SS
        let duration = "";
        const durationISO = videoMetadata.items[0]?.contentDetails.duration;
        if (durationISO) {
          duration = parseISO8601Duration(durationISO);
        }

        metadata.push({
          id : id.videoplaylist.videoid,
          title: videoMetadata.items[0]?.snippet.title || "",
          duration,
          thumbnail: videoMetadata.items[0]?.snippet.thumbnails.default.url || "",
          // theme: theme
        });
      }
      setVideoMetadata(metadata);
      setVideoPlaying(metadata[0]);
    }
    fetchVideoData();
  }, [VideoListsData]);


  return (
    <div className="playlist__wraper md:flex lg:block xl:flex mt-6 dark:shadow-lg shadow-postLight">
      <div className="preview_wraper w-full md:w-[60%] lg:w-full xl:w-[60%] overflow-hidden">
        <iframe 
        className=' w-full' 
        width="300" 
        height="300" 
        src={`https://www.youtube.com/embed/${videoPlaying?.id}`} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
        </iframe>
      </div>
      <div className="list_wraper w-full md:w-[40%] lg:w-full xl:w-[40%]  bg-[#191919]">
        
        <div className='p-2 bg-[#ce061e]'>
          <div className=' flex items-center justify-center'><IoPlaySharp className='w-8 h-8 text-white' />
          <h1 className=' truncate uppercase text-white  text-[13px] font-medium pl-4'>{videoPlaying?.title
          }</h1></div>
          <p className='text-xs font-medium text-white text-right'>{videoPlaying?.duration }</p>
        </div>
        <ul className='video__list  max-h-[230px] overflow-x-hidden overflow-y-scroll'>
          {
            videoMetadata?.map((list) => {
              return(
                <li onClick={() => {
                  setVideoPlaying(list)
                }}  key={list?.id} className={`cursor-pointer flex items-center mt-1 mr-1 ${videoPlaying?.id === list?.id  && `bg-[#27252f] border-l-4 border-[#ce061e]` } `}>
                <div className='w-[20%] md:w-[40%] pl-1'>
                <Image 
                className='rounded-lg w-full ' 
                src={`https://img.youtube.com/vi/${list?.id}/${"default"}.jpg`} 
                width="80" 
                height="65"  
                alt="ss" />
                </div>
                <div className=' w-[80%] md:w-[60%] md:pl-0 pl-2'>
                  <h1 className='line-clamp-2 text-ellipsis text-xs uppercase font-medium text-white'>{list?.title}</h1>
                  <p className='text-xs font-medium pt-1 text-gray-600'>{list?.duration}</p>
                </div>
              </li>
              )
            })
          }
   
        </ul>
      </div>
    </div>
  )
}
