import exteriorPanorama from '../assets/exterior-panorama.jpg';
import exteriorPath from '../assets/exterior-path.jpg';
import houseFront from '../assets/house-front.webp';
import winterNight from '../assets/winter-night.jpg';
import livingRoom from '../assets/living-room.jpg';
import livingKitchen from '../assets/living-kitchen.jpg';
import kitchen from '../assets/kitchen.jpg';
import bedroomDouble from '../assets/bedroom-double.jpg';
import bedroomTwin from '../assets/bedroom-twin.jpg';
import bathroom from '../assets/bathroom.jpg';

export interface Photo {
    src: string;
    alt: string;
}

export const photos = {
    exteriorPanorama: { src: exteriorPanorama, alt: 'Domki Galion w słoneczny dzień – widok na ogród i plac zabaw' },
    houseFront: { src: houseFront, alt: 'Domek z werandą i kwitnącym ogrodem od frontu' },
    exteriorPath: { src: exteriorPath, alt: 'Ścieżka przez zielony ogród prowadząca do domków' },
    winterNight: { src: winterNight, alt: 'Ośnieżone domki nocą – oświetlona alejka' },
    livingRoom: { src: livingRoom, alt: 'Salon z narożnikiem, stołem jadalnym i schodami na piętro' },
    livingKitchen: { src: livingKitchen, alt: 'Przestronny salon połączony z aneksem kuchennym' },
    kitchen: { src: kitchen, alt: 'W pełni wyposażony aneks kuchenny' },
    bedroomDouble: { src: bedroomDouble, alt: 'Sypialnia z podwójnym łóżkiem pod drewnianym skosem' },
    bedroomTwin: { src: bedroomTwin, alt: 'Sypialnia z dwoma pojedynczymi łóżkami' },
    bathroom: { src: bathroom, alt: 'Łazienka w marynistycznym stylu z kabiną prysznicową' },
} satisfies Record<string, Photo>;
