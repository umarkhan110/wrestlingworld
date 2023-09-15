import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router";

const SinglePostItemTwo = ({ postContentArray, uri }) => {

  const router = useRouter();


  const [pegination, setPegination] = useState(1);

  const [formattedMarkup, setFormattedMarkup] = useState('')
  // console.log(router)

  const onPreviousClick = useCallback(() => {
    window.scrollTo(0, 0);
    document.body.focus()
    setPegination(pegination - 1);
    router.push(`${uri}?p=${pegination - 1}`, undefined, { shallow: true })

  }, [pegination, uri]);

  const onNextClick = useCallback(() => {
    window.scrollTo(0, 0);
    document.body.focus()
    setPegination(pegination + 1);
    router.push(`${uri}?p=${pegination + 1}`, undefined, { shallow: true })

  }, [pegination, uri]);


  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }

    const parser = new DOMParser();
    let content = "<body>" + postContentArray[pegination - 1] + "</body>"
    const doc = parser.parseFromString(content, "text/html");

    let h2Elements = doc.body.querySelectorAll('h2')

    let desktop_ads_container = `
          <div class="lg:flex hidden flex-row w-fit mx-auto ">
            <div class="w-fit" data-aaad='true' data-aa-adunit='/22181265/ww_g_300v_1'></div>
            <div class="w-fit" data-aaad='true' data-aa-adunit='/22181265/ww_g_300v_2'></div>
          </div>
          <div class="mx-auto w-fit lg:hidden block " data-aaad='true' data-aa-adunit='/22181265/ww_mob_g_1'></div>
          `
    h2Elements.forEach(h2 => {
      h2.insertAdjacentHTML('beforebegin', desktop_ads_container);
    });
    setFormattedMarkup(doc.body.innerHTML)
    return;
  }, [pegination]);

  useEffect(() => {
    if (pegination === 1) {
      router.push(`${uri}`)
    }
  }, [uri, pegination])

  // console.log(pegination)
  // console.log(uri)

  return (
    <>

      <div className='font_nunito px-[10px] lg:px-0 text-[#222] dark:text-[#ccc] conetnt_blog text-[18px] font-normal leading-8' dangerouslySetInnerHTML={{ __html: formattedMarkup }} />

      <div className="w-full grid grid-cols-2 gap-10 pb-5 ">
        <button
          onClick={onPreviousClick}
          disabled={pegination <= 1}
          className="py-3 w-full uppercase font-khand-headers rounded-[3px] text-white bg-main transition-colors font-bold hover:bg-black flex items-center justify-center bg-[#ce061e] disabled:bg-main disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>


        <button
          onClick={onNextClick}
          disabled={pegination === postContentArray?.length - 0}
          className="bg-[#ce061e] py-3 w-full uppercase font-khand-headers rounded-[3px] text-white bg-main transition-colors font-bold hover:bg-black flex items-center justify-center disabled:bg-main disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>


      </div>

    </>
  )
}

export default SinglePostItemTwo;


