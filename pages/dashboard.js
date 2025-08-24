// pages/dashboard.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/feed',
      permanent: false,
    },
  };
}

export default function Dashboard() {
  return null;
}
