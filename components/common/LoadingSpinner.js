import {Grid} from "react-loader-spinner";

function LoadingSpinner({ size = 40 }) {
  return (
    // <Loader type="Grid" color="#ce061e" width={size} height={size} />
    <Grid
      height={size}
      width={size}
      color="#ce061e"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default LoadingSpinner;