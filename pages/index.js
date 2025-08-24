// pages/index.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/feed', // immer auf /feed
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}
