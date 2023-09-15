export default function AdSlotRight({adRightID}) {
    return (
        <div className='lg:block relative hidden w-[160px] xl:w-[300px] rounded-[4px] right-5  ml-5 '>
            <div className={`fixed top-20  w-[160px] xl:w-[300px] ml-5`}>
                <div data-aaad='true' data-aa-adunit={`/22181265/${adRightID}`}></div>
            </div>
        </div>
    )
}
