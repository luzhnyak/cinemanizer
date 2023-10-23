import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
