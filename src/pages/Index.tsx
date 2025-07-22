import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [calculatorType, setCalculatorType] = useState<'city' | 'intercity'>('city');
  
  // Городские перевозки
  const [hours, setHours] = useState('2');
  const [workersCount, setWorkersCount] = useState('0');
  
  // Межгородние перевозки
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState(0);
  
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCost = () => {
    if (!distance || !truckSize) return;
    
    const distanceKm = parseInt(distance);
    
    // Базовые тарифы на машины (цена за час + цена за км)
    const truckRates = {
      '3': { hourlyRate: 800, kmRate: 30, baseHours: 3 },
      '4.2': { hourlyRate: 1000, kmRate: 35, baseHours: 4 },
      '6': { hourlyRate: 1200, kmRate: 40, baseHours: 5 }
    };
    
    const selectedTruck = truckRates[truckSize as keyof typeof truckRates];
    
    // Расчёт стоимости автотранспорта
    const transportCost = (selectedTruck.hourlyRate * selectedTruck.baseHours) + (distanceKm * selectedTruck.kmRate);
    
    // Услуги грузчиков (час работы)
    const workerCount = parseInt(workers || '0');
    const workerHourlyRate = 450;
    const estimatedWorkHours = apartmentType === '1' ? 2 : apartmentType === '2' ? 3 : apartmentType === '3' ? 4 : apartmentType === '4+' ? 5 : 2;
    const workersCost = workerCount * workerHourlyRate * estimatedWorkHours;
    
    // Надбавки за этаж (если нет лифта)
    let floorSurcharge = 0;
    if (elevator === 'no' && floor) {
      const floorNum = parseInt(floor);
      if (floorNum > 1) {
        floorSurcharge = (floorNum - 1) * 200 * workerCount;
      }
    }
    
    const total = transportCost + workersCost + floorSurcharge;
    
    setEstimatedCost(total);
    setCostBreakdown({
      transport: transportCost,
      workers: workersCost,
      floor: floorSurcharge,
      total: total
    });
  };

  const services = [
    {
      icon: 'Truck',
      title: 'Заказ Газели по городу',
      description: 'Перевозка грузов по Нижнему Новгороду',
      price: '1200₽/час'
    },
    {
      icon: 'MapPin',
      title: 'Заказ Газели по области и РФ',
      description: 'Межгород и дальние расстояния',
      price: '35₽/км'
    },
    {
      icon: 'Users',
      title: 'Заказ грузчиков',
      description: 'Профессиональные грузчики',
      price: '500₽/час'
    },
    {
      icon: 'Home',
      title: 'Квартирный переезд',
      description: '2 грузчика + 1 машина',
      price: '2200₽/час'
    }
  ];

  const trucks = [
    {
      length: '3 метра',
      capacity: '1.5 тонны',
      volume: '10 м³',
      description: 'Студии, 1-комнатные квартиры, небольшие офисы',
      price: '800₽/час + 30₽/км',
      features: ['Тент', 'Ремни', 'Попутная загрузка']
    },
    {
      length: '4.2 метра',
      capacity: '2.5 тонны',
      volume: '17 м³',
      description: '2-3 комнатные квартиры, средние офисы',
      price: '1000₽/час + 35₽/км',
      features: ['Тент', 'Ремни', 'Боковая загрузка', 'Гидроборт по запросу']
    },
    {
      length: '6 метров',
      capacity: '3.5 тонны',
      volume: '33 м³',
      description: '4+ комнатные квартиры, большие офисы, дачи',
      price: '1200₽/час + 40₽/км',
      features: ['Тент', 'Ремни', 'Боковая загрузка', 'Гидроборт']
    }
  ];

  const reviews = [
    {
      name: 'Дмитрий К.',
      rating: 5,
      text: 'Перевозили 3-комнатную квартиру на Автозавод. Работали 4 часа, упаковали всё идеально. Холодильник и стиральную машину донесли без царапин на 5 этаж без лифта!',
      date: '18.07.2024',
      service: 'Квартирный переезд'
    },
    {
      name: 'Мария Владимировна',
      rating: 5,
      text: 'Заказывала газель 4.2м для перевозки мебели с дачи. Приехали точно в срок, помогли погрузить тяжелый шкаф. Цена как договаривались - без доплат.',
      date: '15.07.2024',
      service: 'Грузоперевозка'
    },
    {
      name: 'Андрей Петрович',
      rating: 5,
      text: 'Офис переезжал в выходные - очень удобно. 6-метровая газель поместила всё за один рейс. Грузчики работали аккуратно с оргтехникой.',
      date: '13.07.2024',
      service: 'Офисный переезд'
    },
    {
      name: 'Светлана И.',
      rating: 5,
      text: 'Переезд в Сормово прошел отлично! Калькулятор на сайте показал точную цену. Грузчики пришли со своими материалами для упаковки.',
      date: '10.07.2024',
      service: 'Квартирный переезд'
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
                  src="/img/fdd33b9c-ee59-40f6-be0b-c6cd4d6d71a1.jpg" 
                  alt="Профессиональная газель для переезда в Нижнем Новгороде" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={24} className="text-green-500" />
                    <div>
                      <div className="text-2xl font-bold text-orange-500">5+ лет</div>
                      <div className="text-sm text-gray-600">опыта работы</div>
                    </div>
                  </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="space-y-6">
              {/* Переключатель тип расчета */}
              <div className="flex gap-4 justify-center">
                <Button 
                  variant={calculatorType === 'city' ? 'default' : 'outline'}
                  onClick={() => {
                    setCalculatorType('city');
                    setEstimatedCost(0);
                  }}
                  className={calculatorType === 'city' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  Город
                </Button>
                <Button 
                  variant={calculatorType === 'intercity' ? 'default' : 'outline'}
                  onClick={() => {
                    setCalculatorType('intercity');
                    setEstimatedCost(0);
                    setCalculatedDistance(0);
                  }}
                  className={calculatorType === 'intercity' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  Межгород
                </Button>
              </div>

              {/* Городские перевозки */}
              {calculatorType === 'city' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество часов (минимум 2)</label>
                    <Input 
                      type="number" 
                      placeholder="2" 
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      min="2"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество грузчиков</label>
                    <Select value={workersCount} onValueChange={setWorkersCount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите количество" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Без грузчиков</SelectItem>
                        <SelectItem value="1">1 грузчик</SelectItem>
                        <SelectItem value="2">2 грузчика</SelectItem>
                        <SelectItem value="3">3 грузчика</SelectItem>
                        <SelectItem value="4">4 грузчика</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Межгородние перевозки */}
              {calculatorType === 'intercity' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Город загрузки</label>
                    <Input 
                      type="text" 
                      placeholder="Нижний Новгород" 
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Город разгрузки</label>
                    <Input 
                      type="text" 
                      placeholder="Москва" 
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  {calculatedDistance > 0 && (
                    <div className="col-span-2 text-center bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700">
                        Расстояние: {calculatedDistance} км
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Расчёт стоимости */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  {estimatedCost > 0 && (
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-orange-500">
                        {estimatedCost.toLocaleString()} ₽
                      </div>
                      <div className="text-sm text-gray-600">
                        {calculatorType === 'city' ? (
                          <div>
                            {hours} час(ов) × (1200₽ + {workersCount} × 500₽) = {estimatedCost.toLocaleString()}₽
                          </div>
                        ) : (
                          <div>
                            {calculatedDistance} км × 35₽ = {estimatedCost.toLocaleString()}₽
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {estimatedCost === 0 && (
                    <div className="text-sm text-gray-500">
                      {calculatorType === 'city' 
                        ? 'Укажите количество часов и грузчиков для расчёта' 
                        : 'Укажите города для расчёта расстояния'
                      }
                    </div>
                  )}
                </div>
                <Button 
                  onClick={calculateCost} 
                  disabled={isCalculating}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-3"
                >
                  <Icon name="Calculator" size={16} className="mr-2" />
                  {isCalculating ? 'Расчитываю...' : 'Рассчитать'}
                </Button>
              </div>
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
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">{truck.volume}</div>
                    <p className="text-gray-600">{truck.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{truck.price}</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Возможности:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {truck.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Icon name="Check" size={12} className="text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="text-sm text-orange-600 font-medium mt-1">{review.service}</div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-gray-500">{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{review.text}</p>
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
                    <div className="text-gray-600 space-y-1">
                      <div>+7 (831) 423-45-67</div>
                      <div>+7 (920) 123-45-67</div>
                    </div>
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
                    <div className="font-semibold text-gray-900">Обслуживаем районы</div>
                    <div className="text-gray-600">г. Нижний Новгород и область (в радиусе 100 км)</div>
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
                <li>+7 (831) 423-45-67</li>
                <li>+7 (920) 123-45-67</li>
                <li>info@pereezdnnov.ru</li>
                <li>Нижний Новгород, область</li>
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