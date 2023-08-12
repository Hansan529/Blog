import 카카오톡클론 from './카카오톡클론';



interface Params {
  params: { slug: string };
}

export default function Page({ params }: Params) {
  switch (params.slug) {
    case encodeURIComponent('카카오톡클론'):
      return <카카오톡클론 />;
  }
  return;
}
