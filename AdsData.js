const AdsData = {
    // single page ads ID
    "leftID": "ww_a_300v_1",
    "rightID": "ww_a_300v_2",
}
export const generateDesktopAdHTML = (adId) => {
    return `<div class="w-fit lg:block hidden mx-auto " style="margin-bottom: 50px; margin-top: 40px;" data-aaad='true' data-aa-adunit='/22181265/${adId}'></div>`
}

export const generateMobileAdHTML = (adId) => {
    return `<div class="w-[250px] mx-auto lg:hidden block mb-20 mt-20" style="margin-bottom: 50px; margin-top: 40px;"  data-aaad='true' data-aa-adunit='/22181265/${adId}'></div>`
}
export default AdsData;