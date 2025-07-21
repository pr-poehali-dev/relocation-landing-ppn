import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [distance, setDistance] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [workers, setWorkers] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculateCost = () => {
    const baseCost = parseInt(distance) * 50;
    const truckMultiplier = truckSize === '3' ? 1 : truckSize === '4.2' ? 1.3 : 1.6;
    const workersCost = parseInt(workers || '0') * 500;
    const total = (baseCost * truckMultiplier) + workersCost;
    setEstimatedCost(total);
  };

  const services = [
    {
      icon: 'Truck',
      title: 'Квартирные переезды',
      description: 'Быстро и аккуратно перевезем вашу мебель и вещи',
      price: 'от 2000₽'
    },
    {
      icon: 'Building',
      title: 'Офисные переезды',
      description: 'Профессиональный переезд офиса с минимальным простоем',
      price: 'от 5000₽'
    },
    {
      icon: 'Package',
      title: 'Грузоперевозки',
      description: 'Доставка габаритных грузов по городу и области',
      price: 'от 1500₽'
    },
    {
      icon: 'Users',
      title: 'Услуги грузчиков',
      description: 'Опытные грузчики для погрузки и разгрузки',
      price: 'от 500₽/час'
    }
  ];

  const trucks = [
    {
      length: '3 метра',
      capacity: '1.5 тонны',
      description: 'Идеально для небольших переездов и доставки мебели',
      price: '2000₽/день'
    },
    {
      length: '4.2 метра',
      capacity: '2.5 тонны',
      description: 'Оптимален для квартирных переездов 1-2 комнаты',
      price: '2500₽/день'
    },
    {
      length: '6 метров',
      capacity: '3.5 тонны',
      description: 'Подходит для больших переездов и офисов',
      price: '3500₽/день'
    }
  ];

  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Отличная работа! Переехали быстро и аккуратно. Ребята очень вежливые.',
      date: '15.07.2024'
    },
    {
      name: 'Михаил Сидоров',
      rating: 5,
      text: 'Рекомендую! Честные цены, без скрытых доплат. Все вещи довезли целыми.',
      date: '12.07.2024'
    },
    {
      name: 'Елена Козлова',
      rating: 5,
      text: 'Профессиональный подход. Помогли с упаковкой и быстро все погрузили.',
      date: '08.07.2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <Icon name="Truck" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">ПереездННов</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-orange-500 transition-colors">Услуги</a>
              <a href="#trucks" className="text-gray-700 hover:text-orange-500 transition-colors">Автопарк</a>
              <a href="#calculator" className="text-gray-700 hover:text-orange-500 transition-colors">Калькулятор</a>
              <a href="#reviews" className="text-gray-700 hover:text-orange-500 transition-colors">Отзывы</a>
              <a href="#contacts" className="text-gray-700 hover:text-orange-500 transition-colors">Контакты</a>
            </nav>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200">
                  <Icon name="Award" size={16} className="mr-1" />
                  Собственный автопарк
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Надежные <span className="text-orange-500">переезды</span> в Нижнем Новгороде
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Профессиональные услуги переезда с собственным парком газелей 3, 4.2 и 6 метров. Понятные тарифы без скрытых доплат.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                  <Icon name="Play" size={20} className="mr-2" />
                  Посмотреть видео
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-orange-500" />
                  <span>Работаем 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-orange-500" />
                  <span>Страховка грузов</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-orange-500" />
                  <span>5.0 рейтинг</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img 
                  src="/img/13e6f638-99a4-49be-a6ef-7247fd9491a5.jpg" 
                  alt="Газель для переезда" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-500">2000+</div>
                  <div className="text-sm text-gray-600">Успешных переездов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">Полный спектр услуг для вашего переезда</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-orange-500" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-orange-500">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Калькулятор стоимости</h2>
            <p className="text-xl text-gray-600">Узнайте примерную стоимость переезда за 1 минуту</p>
          </div>
          <Card className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Расстояние (км)</label>
                <Input 
                  type="number" 
                  placeholder="10" 
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Размер газели</label>
                <Select value={truckSize} onValueChange={setTruckSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 метра</SelectItem>
                    <SelectItem value="4.2">4.2 метра</SelectItem>
                    <SelectItem value="6">6 метров</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Количество грузчиков</label>
                <Select value={workers} onValueChange={setWorkers}>
                  <SelectTrigger>
                    <SelectValue placeholder="0" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Без грузчиков</SelectItem>
                    <SelectItem value="2">2 грузчика</SelectItem>
                    <SelectItem value="4">4 грузчика</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                {estimatedCost > 0 && (
                  <div className="text-3xl font-bold text-orange-500">
                    {estimatedCost.toLocaleString()} ₽
                  </div>
                )}
                <div className="text-sm text-gray-600">Примерная стоимость</div>
              </div>
              <Button onClick={calculateCost} className="bg-orange-500 hover:bg-orange-600">
                <Icon name="Calculator" size={16} className="mr-2" />
                Рассчитать
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Trucks Section */}
      <section id="trucks" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наш автопарк</h2>
            <p className="text-xl text-gray-600">Газели разных размеров для любых задач</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {trucks.map((truck, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Truck" size={40} className="text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl text-blue-500">{truck.length}</CardTitle>
                  <CardDescription className="text-lg font-semibold">{truck.capacity}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600">{truck.description}</p>
                  <div className="text-2xl font-bold text-orange-500">{truck.price}</div>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-gray-600">Более 2000 довольных клиентов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Свяжитесь с нами</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Icon name="Phone" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Телефон</div>
                    <div className="text-gray-600">+7 (831) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Icon name="Mail" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">info@pereezdnnov.ru</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Icon name="MapPin" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Адрес</div>
                    <div className="text-gray-600">г. Нижний Новгород, ул. Примерная, 123</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Icon name="Clock" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Режим работы</div>
                    <div className="text-gray-600">Круглосуточно, без выходных</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Заказать обратный звонок</CardTitle>
                  <CardDescription>Мы перезвоним вам в течение 5 минут</CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Номер телефона" type="tel" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип услуги" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Квартирный переезд</SelectItem>
                      <SelectItem value="office">Офисный переезд</SelectItem>
                      <SelectItem value="cargo">Грузоперевозка</SelectItem>
                      <SelectItem value="workers">Услуги грузчиков</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Заказать звонок
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-500 text-white p-2 rounded-lg">
                  <Icon name="Truck" size={24} />
                </div>
                <span className="text-2xl font-bold">ПереездННов</span>
              </div>
              <p className="text-gray-400">
                Надежная транспортная компания в Нижнем Новгороде. Качественные переезды с 2015 года.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Квартирные переезды</li>
                <li>Офисные переезды</li>
                <li>Грузоперевозки</li>
                <li>Услуги грузчиков</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Автопарк</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Газель 3 метра</li>
                <li>Газель 4.2 метра</li>
                <li>Газель 6 метров</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (831) 123-45-67</li>
                <li>info@pereezdnnov.ru</li>
                <li>г. Нижний Новгород</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ПереездННов. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;