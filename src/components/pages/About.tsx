import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import aboutImage from '@/assets/about.webp';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-noto-serif text-4xl font-bold mb-6">
                  About Cafe Kinesi
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  心と身体を整える、特別な空間
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Image
                    src={aboutImage}
                    alt="Cafe Kinesi の空間"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    カフェキネシは、日常の喧騒から離れて心と身体を整えることができる特別な空間です。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    アロマテラピー、瞑想、ヨガを通じて、本来の自分らしさを取り戻すお手伝いをいたします。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    一人ひとりに寄り添ったサービスで、心身のバランスを整え、日々の生活により豊かさをもたらします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;