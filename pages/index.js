export default function Home() {
  return null; // wird nie angezeigt
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/feed',
      permanent: false,
    },
  };
}
