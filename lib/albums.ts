export interface Album {
  slug: string
  no: string
  cat: string
  title: string
  thumbnail: { src: string; tone: string; pos: string; scale: string }
  photos: string[]
  cls: string
  count: number
  hidden?: boolean
  virtuallyStaged?: string[]
}

export const albums: Album[] = [
  {
    slug: 'engagement',
    no: '001',
    cat: 'Engagement',
    title: 'Engagement Sessions',
    thumbnail: { src: '/photos/bridal/edited/PRT00663.webp', tone: '8a7060', pos: '6% 55%', scale: '100%' },
    photos: [
      '/photos/bridal/edited/IMG_4164.webp',
      '/photos/bridal/edited/PRT00467.webp',
      '/photos/bridal/edited/PRT00583.webp',
      '/photos/bridal/edited/PRT00589.webp',
      '/photos/bridal/edited/PRT00663.webp',
      '/photos/bridal/edited/PRT00709.webp',
      '/photos/bridal/edited/PRT00720.webp',
      '/photos/bridal/edited/PRT00750.webp',
      '/photos/bridal/edited/PRT00767.webp',
      '/photos/bridal/edited/PRT00768.webp',
      '/photos/bridal/edited/PRT00794.webp',
      '/photos/bridal/edited/PRT00810.webp',
      '/photos/bridal/edited/PRT00817.webp',
      '/photos/bridal/edited/PRT00823.webp',
      '/photos/bridal/edited/PRT00834.webp',
      '/photos/bridal/edited/PRT00836.webp',
      '/photos/bridal/edited/PRT00894.webp',
      '/photos/bridal/edited/PRT01104.webp',
      '/photos/bridal/edited/PRT01276.webp',
    ],
    cls: 'wide w-7',
    count: 19,
  },
  {
    slug: 'wedding',
    no: '002',
    cat: 'Wedding',
    title: 'Wedding Day',
    thumbnail: { src: '/photos/wedding/edited/PRT06008.webp', tone: '4a4440', pos: 'center', scale: 'cover' },
    photos: [
      '/photos/wedding/edited/PRT05939.webp',
      '/photos/wedding/edited/PRT06006.webp',
      '/photos/wedding/edited/PRT06008.webp',
      '/photos/wedding/edited/PRT06167.webp',
      '/photos/wedding/edited/PRT06366.webp',
    ],
    cls: 'tall w-5',
    count: 5,
  },
  {
    slug: 'graduation',
    no: '003',
    cat: 'Graduation',
    title: 'Graduation Portraits',
    thumbnail: { src: '/photos/grad/edited/PRT06362.webp', tone: '7a6858', pos: '80% center', scale: '115%' },
    photos: [
      '/photos/grad/edited/PRT06260.webp',
      '/photos/grad/edited/PRT06273.webp',
      '/photos/grad/edited/PRT06291.webp',
      '/photos/grad/edited/PRT06362.webp',
      '/photos/grad/edited/PRT06423.webp',
      '/photos/grad/edited/PRT06472.webp',
      '/photos/grad/edited/PRT06501.webp',
      '/photos/grad/edited/PRT06523.webp',
      '/photos/grad/edited/IMG_2254.webp',
      '/photos/grad/edited/IMG_2256.webp',
    ],
    cls: 'tall w-5',
    count: 10,
  },
  {
    slug: 'portraits',
    no: '004',
    cat: 'Portraits',
    title: 'Portrait Sessions',
    thumbnail: { src: '/photos/portraits/edited/DSC06503.webp', tone: '8f704d', pos: 'center', scale: 'cover' },
    photos: [
      '/photos/portraits/edited/DSC06503.webp',
    ],
    cls: 'tall w-5',
    count: 1,
    hidden: true,
  },
  {
    slug: 'realestate',
    no: '005',
    cat: 'Real Estate',
    title: 'Real Estate',
    thumbnail: { src: '/photos/realestate/location%201/virtuallystaged.webp', tone: '6a7060', pos: 'center', scale: 'cover' },
    photos: [
      '/photos/realestate/location%201/AV100966-HDR.webp',
      '/photos/realestate/location%201/AV100994-HDR.webp',
      '/photos/realestate/location%201/AV100999-HDR.webp',
      '/photos/realestate/location%201/AV101008-HDR.webp',
      '/photos/realestate/location%201/AV101029-HDR.webp',
      '/photos/realestate/location%201/virtuallystaged.webp',
      '/photos/realestate/location%201/virtuallystaged2.webp',
      '/photos/realestate/location%201/virtuallystaged3.webp',
      '/photos/realestate/location%201/virtuallystaged4.webp',
    ],
    cls: 'wide w-6',
    count: 9,
    virtuallyStaged: [
      '/photos/realestate/location%201/virtuallystaged.webp',
      '/photos/realestate/location%201/virtuallystaged2.webp',
      '/photos/realestate/location%201/virtuallystaged3.webp',
      '/photos/realestate/location%201/virtuallystaged4.webp',
    ],
  },
  {
    slug: 'reception',
    no: '006',
    cat: 'Wedding',
    title: 'Wedding Reception',
    thumbnail: { src: '/photos/vraj/edited/DSC06409.webp', tone: '5a4a40', pos: 'center', scale: 'cover' },
    photos: [
      '/photos/vraj/edited/DSC06393.webp',
      '/photos/vraj/edited/DSC06409.webp',
      '/photos/vraj/edited/DSC06414.webp',
      '/photos/vraj/edited/DSC06417.webp',
      '/photos/vraj/edited/DSC06421.webp',
      '/photos/vraj/edited/DSC06422.webp',
      '/photos/vraj/edited/DSC06423.webp',
    ],
    cls: 'wide w-7',
    count: 7,
  },
]
