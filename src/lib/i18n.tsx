import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "mk" | "en";

const dict = {
  mk: {
    brand: "Ресторан Трла",
    open: "Отворено",
    closed: "Затворено",
    heroTitle: "Добредојдовте во Ресторан Трла",
    hours: "Понеделник – Недела · 07:00 – 00:00",
    hoursTitle: "Работно време",
    menuBtn: "Мени",
    findUs: "Најдете нè лесно",
    todaySpecials: "Денешни специјалитети",
    specialsIntro:
      "Секој ден нешто ново од скарата и од шпоретот на баба — избор на нашиот готвач, подготвен со намирници од локални производители.",
    dishName: "Јадење",
    price: "600 ден",
    content: "Содржина",
    ingredients: "Намирници",
    quantity: "Количина",
    close: "Затвори",
    menuTitle: "Мени",
    menuIntro: "Јадења и пијалоци подредени по категории.",
    category: "Категорија",
    browse: "Прегледај",
    back: "Назад",
    categoryDishes: "Јадења од категоријата",
    reservations: "Резервации",
    reservationsIntro: "Резервирајте маса за вашата вечер во Трла.",
    orders: "Нарачки",
    ordersIntro: "Нарачајте за дома или за понесување.",
    name: "Име и презиме",
    phone: "Телефон",
    date: "Датум",
    time: "Време",
    people: "Број на гости",
    note: "Забелешка",
    address: "Адреса за достава",
    order: "Нарачка",
    send: "Испрати",
    sent: "Ви благодариме! Ќе ве контактираме наскоро.",
    gallery: "Галерија",
    galleryIntro: "Атмосферата на Трла низ слики.",
    events: "Календар на настани",
    eventsIntro: "Живa музика, резервни денови за свадби, прослави и празници.",
    visitUs: "Посетете нè",
    contactUs: "Контактирајте нè",
    followUs: "Следете нè",
    rights: "Сите права задржани.",
    upcoming: "Претстојно",
    schedule: "Распоред",
    reserveTable: "Резервирај маса",
    orderNow: "Нарачај сега",
    eventDetails: "Детали за настанот",
    eventIntro: "Повеќе информации за овој настан во Ресторан Трла.",
  },
  en: {
    brand: "Restaurant Trla",
    open: "Open",
    closed: "Closed",
    heroTitle: "Welcome to Restaurant Trla",
    hours: "Monday – Sunday · 07:00 – 00:00",
    hoursTitle: "Working hours",
    menuBtn: "Menu",
    findUs: "Find us easily",
    todaySpecials: "Today's specials",
    specialsIntro:
      "Something new every day from the grill and grandma's stove — our chef's picks, made with produce from local farmers.",
    dishName: "Dish",
    price: "600 MKD",
    content: "Content",
    ingredients: "Ingredients",
    quantity: "Quantity",
    close: "Close",
    menuTitle: "Menu",
    menuIntro: "Food and drinks sorted by category.",
    category: "Category",
    browse: "Browse",
    back: "Back",
    categoryDishes: "Dishes in this category",
    reservations: "Reservations",
    reservationsIntro: "Book a table for your evening at Trla.",
    orders: "Orders",
    ordersIntro: "Order for delivery or takeaway.",
    name: "Full name",
    phone: "Phone",
    date: "Date",
    time: "Time",
    people: "Guests",
    note: "Note",
    address: "Delivery address",
    order: "Order",
    send: "Send",
    sent: "Thank you! We will contact you shortly.",
    gallery: "Gallery",
    galleryIntro: "The atmosphere of Trla in pictures.",
    events: "Events calendar",
    eventsIntro: "Live music, reserved days for weddings, celebrations and holidays.",
    visitUs: "Visit us",
    contactUs: "Contact us",
    followUs: "Follow us",
    rights: "All rights reserved.",
    upcoming: "Upcoming",
    schedule: "Schedule",
    reserveTable: "Reserve a table",
    orderNow: "Order now",
    eventDetails: "Event details",
    eventIntro: "More information about this event at Restaurant Trla.",
  },
} as const;

export type Key = keyof (typeof dict)["mk"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}>({ lang: "mk", setLang: () => {}, t: (k) => dict.mk[k] });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mk");
  const t = (k: Key) => dict[lang][k];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
