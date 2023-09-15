export default function AdSlotLeft({adLeftID}) {
    return (
        <div className=' lg:block hidden w-[160px] xl:w-[300px] mr-5'>
            <div className={`fixed top-20 w-[160px] xl:w-[300px]  mr-5`}>
                <div data-aaad='true' data-aa-adunit={`/22181265/${adLeftID}`}></div>
            </div>
        </div>
    )
}
