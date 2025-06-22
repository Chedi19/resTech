import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Notre Mission',
      description: 'Simplifier la recherche et la location d\'appartements à Korbes en offrant une plateforme moderne, sécurisée et transparente.',
    },
    {
      icon: Users,
      title: 'Notre Équipe',
      description: 'Une équipe passionnée d\'experts immobiliers et de développeurs dédiés à améliorer votre expérience de location.',
    },
    {
      icon: Award,
      title: 'Notre Engagement',
      description: 'Nous nous engageons à vérifier chaque logement et à garantir des transactions sécurisées pour tous nos utilisateurs.',
    },
    {
      icon: Heart,
      title: 'Notre Vision',
      description: 'Devenir la référence en matière de location d\'appartements à Korbes, en créant des liens durables entre propriétaires et locataires.',
    },
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Générale',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      description: '10 ans d\'expérience dans l\'immobilier',
    },
    {
      name: 'Pierre Martin',
      role: 'Responsable Technique',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
      description: 'Expert en développement web et UX',
    },
    {
      name: 'Sophie Laurent',
      role: 'Responsable Client',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      description: 'Spécialisée en relation client et support',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            À propos de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Korbes Rent
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Nous révolutionnons la location d'appartements à Korbes avec une approche moderne, 
            transparente et centrée sur l'utilisateur.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Fondée en 2024, Korbes Rent est née d'un constat simple : la recherche d'appartement 
                  à Korbes était complexe, chronophage et souvent frustrante pour les locataires comme 
                  pour les propriétaires.
                </p>
                <p>
                  Notre équipe a décidé de créer une solution moderne qui simplifie ce processus en 
                  utilisant les dernières technologies web et en mettant l'expérience utilisateur 
                  au cœur de notre approche.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'être la plateforme de référence pour la location 
                  d'appartements à Korbes, avec des centaines de logements vérifiés et des milliers 
                  d'utilisateurs satisfaits.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                alt="Appartement moderne"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Appartements disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les personnes qui rendent Korbes Rent possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Appartements</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-blue-100">Utilisateurs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Rejoignez l'aventure Korbes Rent
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Que vous soyez locataire ou propriétaire, nous sommes là pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/apartments"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Trouver un appartement
            </a>
            <a
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;