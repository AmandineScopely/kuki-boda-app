import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

/*******************************************************************************/
/* Use https://icons.expo.fyi/Index for the iconComponent and iconName fields. */
/* The "slug" value is the name of the file in app/(tabs)/ folder **************/
/*******************************************************************************/

export interface HomeIconsType {
    id: number;
    title_FR: string;
    title_ES: string;
    slug: string;
    iconComponent: React.ComponentType<{ name: string; size: number; color: string }>;
    iconName: string;
}

export const LANGUAGE = 'ES';

export const HOME_ICONS_DATA: HomeIconsType[] = [
    {
        id: 1,
        title_FR: 'Date',
        title_ES: 'Fecha',
        slug: 'date',
        iconComponent: MaterialIcons,
        iconName: 'date-range',
    },
    {
        id: 2,
        title_FR: 'Lieu',
        title_ES: 'Lugar',
        slug: 'venue',
        iconComponent: MaterialIcons,
        iconName: 'place',
    },
    {
        id: 3,
        title_FR: 'RSVP',
        title_ES: 'Confirmar asistencia',
        slug: 'confirm',
        iconComponent: MaterialIcons,
        iconName: 'event',
    },
    {
        id: 4,
        title_FR: 'Allergies',
        title_ES: 'Alergias',
        slug: 'allergies',
        iconComponent: MaterialIcons,
        iconName: 'warning',
    },
    {
        id: 5,
        title_FR: 'Activités',
        title_ES: 'Actividades',
        slug: 'activities',
        iconComponent: MaterialIcons,
        iconName: 'local-activity',
    },
    {
        id: 6,
        title_FR: 'Dress code',
        title_ES: 'Código de vestimenta',
        slug: 'dresscode',
        iconComponent: FontAwesome6,
        iconName: 'person-dress',
    },
    {
        id: 7,
        title_FR: 'Blog',
        title_ES: 'Blog',
        slug: 'blog',
        iconComponent: MaterialCommunityIcons,
        iconName: 'notebook',
    },
    {
        id: 8,
        title_FR: 'Notre histoire',
        title_ES: 'Nuestra historia',
        slug: 'us',
        iconComponent: MaterialCommunityIcons,
        iconName: 'heart',
    },
]
