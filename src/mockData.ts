import { ConventionDay, FAQ, Session, Update, VenueLocation } from './types';
import { Language } from './i18n';

export const CONVENTION_DAYS: Record<Language, ConventionDay[]> = {
  en: [
    { id: '2026-03-26', shortLabel: 'Thu', dayNumber: '26', fullLabel: 'Thursday, March 26, 2026', homeLabel: 'Arrival Day' },
    { id: '2026-03-27', shortLabel: 'Fri', dayNumber: '27', fullLabel: 'Friday, March 27, 2026', homeLabel: 'Convention Day 1' },
    { id: '2026-03-28', shortLabel: 'Sat', dayNumber: '28', fullLabel: 'Saturday, March 28, 2026', homeLabel: 'Convention Day 2' },
    { id: '2026-03-29', shortLabel: 'Sun', dayNumber: '29', fullLabel: 'Sunday, March 29, 2026', homeLabel: 'Closing Day' },
  ],
  tl: [
    { id: '2026-03-26', shortLabel: 'Huw', dayNumber: '26', fullLabel: 'Huwebes, Marso 26, 2026', homeLabel: 'Araw ng Pagdating' },
    { id: '2026-03-27', shortLabel: 'Biy', dayNumber: '27', fullLabel: 'Biyernes, Marso 27, 2026', homeLabel: 'Unang Araw ng Kumbensiyon' },
    { id: '2026-03-28', shortLabel: 'Sab', dayNumber: '28', fullLabel: 'Sabado, Marso 28, 2026', homeLabel: 'Ikalawang Araw ng Kumbensiyon' },
    { id: '2026-03-29', shortLabel: 'Lin', dayNumber: '29', fullLabel: 'Linggo, Marso 29, 2026', homeLabel: 'Araw ng Pagsasara' },
  ],
  ja: [
    { id: '2026-03-26', shortLabel: '木', dayNumber: '26', fullLabel: '2026年3月26日 木曜日', homeLabel: '到着日' },
    { id: '2026-03-27', shortLabel: '金', dayNumber: '27', fullLabel: '2026年3月27日 金曜日', homeLabel: '大会 第1日目' },
    { id: '2026-03-28', shortLabel: '土', dayNumber: '28', fullLabel: '2026年3月28日 土曜日', homeLabel: '大会 第2日目' },
    { id: '2026-03-29', shortLabel: '日', dayNumber: '29', fullLabel: '2026年3月29日 日曜日', homeLabel: '閉幕日' },
  ],
  'zh-TW': [
    { id: '2026-03-26', shortLabel: '四', dayNumber: '26', fullLabel: '2026年3月26日 星期四', homeLabel: '抵達日' },
    { id: '2026-03-27', shortLabel: '五', dayNumber: '27', fullLabel: '2026年3月27日 星期五', homeLabel: '年會第一天' },
    { id: '2026-03-28', shortLabel: '六', dayNumber: '28', fullLabel: '2026年3月28日 星期六', homeLabel: '年會第二天' },
    { id: '2026-03-29', shortLabel: '日', dayNumber: '29', fullLabel: '2026年3月29日 星期日', homeLabel: '閉幕日' },
  ],
  ko: [
    { id: '2026-03-26', shortLabel: '목', dayNumber: '26', fullLabel: '2026년 3월 26일 목요일', homeLabel: '도착일' },
    { id: '2026-03-27', shortLabel: '금', dayNumber: '27', fullLabel: '2026년 3월 27일 금요일', homeLabel: '총회 1일차' },
    { id: '2026-03-28', shortLabel: '토', dayNumber: '28', fullLabel: '2026년 3월 28일 토요일', homeLabel: '총회 2일차' },
    { id: '2026-03-29', shortLabel: '일', dayNumber: '29', fullLabel: '2026년 3월 29일 일요일', homeLabel: '폐막일' },
  ],
};

const baseSessions = [
  {
    id: 'registration',
    day: '2026-03-26' as const,
    time: '08:00',
    endTime: '17:00',
    status: 'now' as const,
  },
  {
    id: 'welcome-briefing',
    day: '2026-03-26' as const,
    time: '09:30',
    endTime: '10:15',
    status: 'next' as const,
  },
  {
    id: 'opening-ceremony',
    day: '2026-03-27' as const,
    time: '09:00',
    endTime: '10:30',
  },
  {
    id: 'club-growth',
    day: '2026-03-27' as const,
    time: '11:00',
    endTime: '12:00',
    isSaved: true,
  },
  {
    id: 'service-showcase',
    day: '2026-03-27' as const,
    time: '14:00',
    endTime: '15:15',
  },
  {
    id: 'slp-spotlight',
    day: '2026-03-28' as const,
    time: '09:00',
    endTime: '10:00',
  },
  {
    id: 'house-of-delegates',
    day: '2026-03-28' as const,
    time: '10:30',
    endTime: '12:30',
    isSaved: true,
  },
  {
    id: 'manila-night',
    day: '2026-03-28' as const,
    time: '19:00',
    endTime: '21:00',
  },
  {
    id: 'closing',
    day: '2026-03-29' as const,
    time: '10:00',
    endTime: '11:30',
  },
];

export const SESSIONS: Record<Language, Session[]> = {
  en: baseSessions.map(s => ({...s, 
    ...(s.id === 'registration' && {
      title: 'Registration and Delegate Badge Pickup',
      room: 'Hall 1 Lobby',
      venue: 'SMX Convention Center Manila',
      category: ['General'],
      description: 'Pick up your delegate badge, printed program, and welcome kit. Please prepare your confirmation message or ID for faster service.',
      speakers: []
    }),
    ...(s.id === 'welcome-briefing' && {
      title: 'Welcome Briefing for District Delegations',
      room: 'Meeting Room 2',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'A short orientation on venue flow, help desks, translation support, and the most important schedule items for the first day.',
      speakers: [{ name: 'Gov. Maria Lourdes Santos', role: 'Host District Chair, Kiwanis ASPAC Manila 2026', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'opening-ceremony' && {
      title: 'Opening Ceremony and Parade of Nations',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'The official opening of ASPAC Manila 2026 with district introductions, welcome messages, and the Parade of Nations.',
      speakers: [{ name: 'Kiwanis ASPAC Leadership Team', role: 'Convention Opening Program', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'club-growth' && {
      title: 'Club Growth and Member Retention Workshop',
      room: 'Function Room 4',
      venue: 'SMX Convention Center Manila',
      category: ['Leadership'],
      description: 'Practical ideas from district leaders on how to welcome new members, keep clubs active, and simplify follow-through after convention.',
      speakers: [{ name: 'Atty. Kenji Dela Cruz', role: 'District Membership Chair', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'service-showcase' && {
      title: 'Service Project Showcase Across ASPAC',
      room: 'Ballroom B',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC', 'Service'],
      description: 'Delegates from across the region share projects that improved child health, education, and community resilience.',
      speakers: []
    }),
    ...(s.id === 'slp-spotlight' && {
      title: 'Service Leadership Programs Spotlight',
      room: 'Function Room 2',
      venue: 'SMX Convention Center Manila',
      category: ['Service', 'Highlights'],
      description: 'A focused session on Key Club, Circle K, and other Service Leadership Programs with examples delegates can bring home.',
      speakers: []
    }),
    ...(s.id === 'house-of-delegates' && {
      title: 'ASPAC House of Delegates Session',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC'],
      description: 'Business session for official delegates including reports, motions, and announcements relevant to district leadership.',
      speakers: []
    }),
    ...(s.id === 'manila-night' && {
      title: 'Manila Fellowship Night and Cultural Program',
      room: 'SMX Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['Highlights'],
      description: 'An evening of fellowship, cultural performances, and district friendship activities. Formal or national dress is welcome.',
      speakers: []
    }),
    ...(s.id === 'closing' && {
      title: 'Closing Ceremony and Host Handover',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'Closing remarks, district acknowledgements, and the handover to the next ASPAC host city.',
      speakers: []
    })
  })) as Session[],
  tl: baseSessions.map(s => ({...s, 
    ...(s.id === 'registration' && {
      title: 'Rehistrasyon at Pagkuha ng mga Delegate Badge',
      room: 'Hall 1 Lobby',
      venue: 'SMX Convention Center Manila',
      category: ['General'],
      description: 'Kunin ang iyong delegate badge, nakalimbag na programa, at welcome kit. Ihanda ang inyong confirmation message para sa mas mabilis na serbisyo.',
      speakers: []
    }),
    ...(s.id === 'welcome-briefing' && {
      title: 'Orientation para sa mga Delegasyon ng Distrito',
      room: 'Meeting Room 2',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'Isang maikling orientation sa daloy ng mga lugar, help desks, tulong sa pagsasalin ng wika, at mga mahahalagang bahagi ng iskedyul sa unang araw.',
      speakers: [{ name: 'Gov. Maria Lourdes Santos', role: 'Host District Chair, Kiwanis ASPAC Manila 2026', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'opening-ceremony' && {
      title: 'Pambungad na Seremonya at Parade of Nations',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'Ang opisyal na pambungad ng ASPAC Manila 2026 kasama ang pagpapakilala ng mga distrito, at ang Parade of Nations.',
      speakers: [{ name: 'Kiwanis ASPAC Leadership Team', role: 'Programa sa Pagsisimula ng Kumbensiyon', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'club-growth' && {
      title: 'Workshop sa Pagpapalago ng mga Club at Miyembro',
      room: 'Function Room 4',
      venue: 'SMX Convention Center Manila',
      category: ['Leadership'],
      description: 'Mga praktikal na ideya mula sa mga pinuno ng distrito kung paano tanggapin ang mga bagong miyembro at panatilihing aktibo ang mga club pagkatapos ng kumbensiyon.',
      speakers: [{ name: 'Atty. Kenji Dela Cruz', role: 'District Membership Chair', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'service-showcase' && {
      title: 'Mga Proyektong Panseserbisyo sa Buong ASPAC',
      room: 'Ballroom B',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC', 'Service'],
      description: 'Pagbabahagi ng mga delegado mula sa buong rehiyon ng mga proyekto na nakapagpabuti ng kalusugan ng bata, edukasyon, at katatagan ng komunidad.',
      speakers: []
    }),
    ...(s.id === 'slp-spotlight' && {
      title: 'Service Leadership Programs Spotlight',
      room: 'Function Room 2',
      venue: 'SMX Convention Center Manila',
      category: ['Service', 'Highlights'],
      description: 'Isang nakatuon na session sa Key Club, Circle K, at iba pang Service Leadership Programs na may mga halimbawang maaaring iuwi ng mga delegado.',
      speakers: []
    }),
    ...(s.id === 'house-of-delegates' && {
      title: 'ASPAC House of Delegates Session',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC'],
      description: 'Sesyon ng negosyo para sa mga opisyal na delegado kabilang ang mga ulat at mga anunsyo na mahalaga sa pamunuan ng distrito.',
      speakers: []
    }),
    ...(s.id === 'manila-night' && {
      title: 'Manila Fellowship Night at Pangkulturang Programa',
      room: 'SMX Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['Highlights'],
      description: 'Isang gabi ng pakikipagkapwa-tao, kultural na pagtatanghal, at pagpapatibay ng distrito. Malugod na tinatanggap ang pormal o pambansang kasuotan.',
      speakers: []
    }),
    ...(s.id === 'closing' && {
      title: 'Pagsasara na Seremonya at Paglipat sa Susunod na Host',
      room: 'Grand Ballroom',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: 'Mga huling salita, pagkilala sa distrito, at ang paglipat ng responsibilidad sa susunod na lungsod ng ASPAC.',
      speakers: []
    })
  })) as Session[],
  ja: baseSessions.map(s => ({...s, 
    ...(s.id === 'registration' && {
      title: '登録と参加者バッジの受け取り',
      room: 'Hall 1 ロビー',
      venue: 'SMX Convention Center Manila',
      category: ['General'],
      description: 'バッジ、プログラム、ウェルカムキットをお受け取りください。スムーズな対応のため確認メッセージやIDを事前にご準備ください。',
      speakers: []
    }),
    ...(s.id === 'welcome-briefing' && {
      title: '各地区代表団向けウェルカムオリエンテーション',
      room: 'ミーティングルーム 2',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: '会場の案内、ヘルプデスク、通訳サポート、および初日の重要なスケジュールに関する短いオリエンテーションです。',
      speakers: [{ name: 'Gov. Maria Lourdes Santos', role: 'キワニスASPACマニラ2026 ホスト地区ガバナー', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'opening-ceremony' && {
      title: '開会式とパレード・オブ・ネーション',
      room: 'グランドボールルーム',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: '地区の紹介、ウェルカムメッセージ、およびパレード・オブ・ネーションを伴うASPACマニラ2026の公式開会式です。',
      speakers: [{ name: 'キワニスASPACリーダーシップチーム', role: '大会開会プログラム', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'club-growth' && {
      title: 'クラブの成長と会員維持ワークショップ',
      room: 'ファンクションルーム 4',
      venue: 'SMX Convention Center Manila',
      category: ['Leadership'],
      description: '新しいメンバーの迎え方やクラブの活性化について、地区のリーダーたちによる実用的なアイデアを共有します。',
      speakers: [{ name: 'Atty. Kenji Dela Cruz', role: '地区メンバーシップ委員長', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'service-showcase' && {
      title: 'ASPAC全体の奉仕プロジェクトショーケース',
      room: 'ボールルーム B',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC', 'Service'],
      description: '子供の健康、教育、地域のレジリエンスを向上させた各地域のプロジェクトを発表し合います。',
      speakers: []
    }),
    ...(s.id === 'slp-spotlight' && {
      title: 'サービス・リーダーシップ・プログラム (SLP) のスポットライト',
      room: 'ファンクションルーム 2',
      venue: 'SMX Convention Center Manila',
      category: ['Service', 'Highlights'],
      description: 'キークラブやサークルKなどのSLPに焦点を当てたセッションで、自国に持ち帰れる事例を共有します。',
      speakers: []
    }),
    ...(s.id === 'house-of-delegates' && {
      title: 'ASPAC代議員会',
      room: 'グランドボールルーム',
      venue: 'SMX Convention Center Manila',
      category: ['ASPAC'],
      description: '公式代表者向けのビジネスセッションで、今後のリーダーシップに関連する報告、動議、および発表が含まれます。',
      speakers: []
    }),
    ...(s.id === 'manila-night' && {
      title: 'マニラ懇親会の夜と文化プログラム',
      room: 'SMXグランドボールルーム',
      venue: 'SMX Convention Center Manila',
      category: ['Highlights'],
      description: '親睦、文化パフォーマンス、そして地区を超えた友情を深める夜です。フォーマルまたは民族衣装の着用が歓迎されます。',
      speakers: []
    }),
    ...(s.id === 'closing' && {
      title: '閉会式および次回開催都市への引き継ぎ',
      room: 'グランドボールルーム',
      venue: 'SMX Convention Center Manila',
      category: ['General', 'Highlights'],
      description: '閉会の挨拶、各地区への感謝の言葉、そして次期ASPAC開催都市への引き継ぎが行われます。',
      speakers: []
    })
  })) as Session[],
  'zh-TW': baseSessions.map(s => ({...s, 
    ...(s.id === 'registration' && {
      title: '報到與領取與會大會證件',
      room: '一樓大廳 (Hall 1 Lobby)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['General'],
      description: '領取您的名牌、會議議程手冊和歡迎包。請準備好您的確認信或證件以加快處理速度。',
      speakers: []
    }),
    ...(s.id === 'welcome-briefing' && {
      title: '各區代表團迎新簡報',
      room: '會議室 2 (Meeting Room 2)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['General', 'Highlights'],
      description: '針對場地動線、服務台、語言支援以及第一天重要事項進行的簡短說明。',
      speakers: [{ name: 'Gov. Maria Lourdes Santos', role: 'Kiwanis ASPAC 馬尼拉主辦區主席', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'opening-ceremony' && {
      title: '開幕典禮與萬國大遊行',
      room: '大宴會廳 (Grand Ballroom)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['General', 'Highlights'],
      description: '正式開幕典禮將包括各區介紹、歡迎致詞以及焦點的萬國大遊行。',
      speakers: [{ name: '同濟會 ASPAC 領導團隊', role: '大會開幕計畫', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'club-growth' && {
      title: '分會成長與會員保留工作坊',
      room: '功能室 4 (Function Room 4)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['Leadership'],
      description: '分享各區領袖如何歡迎新成員、保持分會活躍度的實用建議，以及會後跟進的技巧。',
      speakers: [{ name: 'Atty. Kenji Dela Cruz', role: '地區發展委員會主委', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'service-showcase' && {
      title: 'ASPAC 區際社會服務專案展示',
      room: 'B號宴會廳 (Ballroom B)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['ASPAC', 'Service'],
      description: '來自亞太各國的與會者分享改善兒童健康、教育和社區韌性的精彩案例。',
      speakers: []
    }),
    ...(s.id === 'slp-spotlight' && {
      title: '服務領導力計畫 (SLP) 專題報告',
      room: '功能室 2 (Function Room 2)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['Service', 'Highlights'],
      description: '專注於同濟校園服務學社 (Key Club, Circle K) 的討論，提供可帶回本土應用的靈感。',
      speakers: []
    }),
    ...(s.id === 'house-of-delegates' && {
      title: 'ASPAC 首席代表會議 (House of Delegates)',
      room: '大宴會廳 (Grand Ballroom)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['ASPAC'],
      description: '提供給官方代表的業務會議，包含報告、動議與各區關注的公告。',
      speakers: []
    }),
    ...(s.id === 'manila-night' && {
      title: '馬尼拉聯誼之夜與文化之夜',
      room: 'SMX大宴會廳',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['Highlights'],
      description: '充滿交流、文化表演及同濟友誼之夜。歡迎穿著正式服裝或傳統服飾參與。',
      speakers: []
    }),
    ...(s.id === 'closing' && {
      title: '閉幕典禮與主辦權交接',
      room: '大宴會廳 (Grand Ballroom)',
      venue: 'SMX 會議中心 (SMX Convention Center Manila)',
      category: ['General', 'Highlights'],
      description: '閉幕致詞、各區感謝儀式，以及會旗交接給下一屆 ASPAC 舉辦城市。',
      speakers: []
    })
  })) as Session[],
  ko: baseSessions.map(s => ({...s, 
    ...(s.id === 'registration' && {
      title: '등록 및 명찰 수령',
      room: '홀 1 로비',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['General'],
      description: '명찰, 인쇄된 프로그램, 웰컴 키트를 수령해 주세요. 더 빠른 처리를 위해 예약 확인서나 신분증을 미리 준비해 주시기 바랍니다.',
      speakers: []
    }),
    ...(s.id === 'welcome-briefing' && {
      title: '각 지구 대표단 환영 오리엔테이션',
      room: '미팅 룸 2',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['General', 'Highlights'],
      description: '행사장 동선, 헬프 데스크, 통역 지원 및 첫날 중요한 일정에 대한 짧은 안내가 진행됩니다.',
      speakers: [{ name: 'Gov. Maria Lourdes Santos', role: '국제키와니스 ASPAC 마닐라 2026 호스트 지구 총재', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'opening-ceremony' && {
      title: '개막식 및 국가 퍼레이드',
      room: '그랜드 볼룸',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['General', 'Highlights'],
      description: '지구 소개, 환영사, 국가 퍼레이드와 함께하는 ASPAC 마닐라 2026의 공식 개막식입니다.',
      speakers: [{ name: '키와니스 ASPAC 리더십 팀', role: '대회 개막 프로그램', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'club-growth' && {
      title: '클럽 성장 및 회원 유지 워크샵',
      room: '펑션 룸 4',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['Leadership'],
      description: '새로운 회원을 환영하고, 클럽을 활성화하며, 총회 이후의 협의를 쉽게 진행하는 방법에 대한 지구 리더들의 실용적인 아이디어 공유.',
      speakers: [{ name: 'Atty. Kenji Dela Cruz', role: '지구 회원 위원장', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' }]
    }),
    ...(s.id === 'service-showcase' && {
      title: 'ASPAC 봉사 프로젝트 쇼케이스',
      room: '볼룸 B',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['ASPAC', 'Service'],
      description: '어린이 건강, 교육, 지역 사회 회복력을 향상시킨 아태 전역의 성공적인 프로젝트를 공유 받습니다.',
      speakers: []
    }),
    ...(s.id === 'slp-spotlight' && {
      title: '봉사 리더십 프로그램(SLP) 스포트라이트',
      room: '펑션 룸 2',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['Service', 'Highlights'],
      description: '키 클럽, 서클 K 및 기타 SLP에 중점을 둔 세션으로 귀국 후 적용할 수 있는 사례를 배웁니다.',
      speakers: []
    }),
    ...(s.id === 'house-of-delegates' && {
      title: 'ASPAC 대의원 회의(House of Delegates)',
      room: '그랜드 볼룸',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['ASPAC'],
      description: '공식 대의원을 위한 비즈니스 세션으로 보고, 발의 및 지구 리더십과 관련된 주요 공지가 포함됩니다.',
      speakers: []
    }),
    ...(s.id === 'manila-night' && {
      title: '마닐라 민족의 밤 및 문화 행사',
      room: 'SMX 그랜드 볼룸',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['Highlights'],
      description: '친목 도모, 문화 공연, 지구 간 교류가 어우러지는 밤입니다. 정장이나 각국의 전통 의상을 환영합니다.',
      speakers: []
    }),
    ...(s.id === 'closing' && {
      title: '폐막식 및 차기 개최지 이양',
      room: '그랜드 볼룸',
      venue: 'SMX 컨벤션 센터 마닐라',
      category: ['General', 'Highlights'],
      description: '폐회사, 각 지구에 대한 감사 인사 및 차기 ASPAC 개최 도시로의 권한 이양식.',
      speakers: []
    })
  })) as Session[],
};

// Now do UPDATES, VENUE_LOCATIONS, FAQS
export const UPDATES: Record<Language, Update[]> = {
  en: [
    { id: 'u1', type: 'urgent', title: 'Opening Ceremony overflow seating now available', content: 'Delegates may also use Meeting Rooms 1 and 2 for live screen viewing. Ushers are guiding attendees from the main ballroom entrance.', time: '7:30 AM • Thu, Mar 26', action: { label: 'Open venue guide', tab: 'venue', venueLocationId: 'grand-ballroom' } },
    { id: 'u2', type: 'info', title: 'Language help desk is open at registration', content: 'English, Filipino, Japanese, and Korean support is available beside the delegate badge counters during peak arrival hours.', time: '8:10 AM • Thu, Mar 26', action: { label: 'See attendee help', tab: 'help' } },
    { id: 'u3', type: 'venue', title: 'Wi-Fi and charging stations ready in the south lobby', content: 'Use network SMX-ASPAC-2026. Ask the Help Desk for the current passcode. Charging tables are beside the Help Desk near Hall 1 Lobby.', time: '8:20 AM • Thu, Mar 26', action: { label: 'Open help details', tab: 'help' } },
    { id: 'u4', type: 'news', title: 'Tonight’s ASPAC highlights include welcome music and district photos', content: 'The evening welcome block begins after registration day with a short Manila cultural welcome and district group photos in the lobby.', time: '9:00 AM • Thu, Mar 26', action: { label: 'View today’s schedule', tab: 'schedule' } }
  ],
  tl: [
    { id: 'u1', type: 'urgent', title: 'May karagdagang upuan na para sa Pambungad na Seremonya', content: 'Maaari ding gamitin ang Meeting Rooms 1 at 2 para manood nang live sa screen. Gagabayan kayo ng mga usher mula sa ballroom entrance.', time: '7:30 AM • Huw, Mar 26', action: { label: 'Tingnan ang venue guide', tab: 'venue', venueLocationId: 'grand-ballroom' } },
    { id: 'u2', type: 'info', title: 'Bukas na ang Language Help Desk sa registration', content: 'Bukas at nakatulong ang English, Filipino, Japanese, at Korean interpreters katabi ng mga counter para sa badge.', time: '8:10 AM • Huw, Mar 26', action: { label: 'Tingnan ang tulong', tab: 'help' } },
    { id: 'u3', type: 'venue', title: 'Handa na ang Wi-Fi at charging stations sa South Lobby', content: 'Gamitin ang network na SMX-ASPAC-2026. Kunin ang kasalukuyang passcode sa Help Desk. Ang mga lamesa para sa pag-charge ay malapit sa Help Desk.', time: '8:20 AM • Huw, Mar 26', action: { label: 'Tingnan ang detalye', tab: 'help' } },
    { id: 'u4', type: 'news', title: 'Highlight ngayong gabi: musikang panghalina at litrato ng mga distrito', content: 'Ang welcome block para sa gabi ay magsisimula pagkatapos ng rehistrasyon at may cultural welcome show at picture taking.', time: '9:00 AM • Huw, Mar 26', action: { label: 'Iskedyul Ngayon', tab: 'schedule' } }
  ],
  ja: [
    { id: 'u1', type: 'urgent', title: '開会式の追加座席（オーバーフロー）が利用可能です', content: 'ライブ中継のスクリーンを準備したミーティングルーム1と2もご利用いただけます。入口のスタッフがご案内します。', time: '3月26日(木) 7:30 AM', action: { label: '会場ガイドを開く', tab: 'venue', venueLocationId: 'grand-ballroom' } },
    { id: 'u2', type: 'info', title: '登録受付の語学ヘルプデスクが開設されました', content: '英語、タガログ語、日本語、韓国語のサポートが、到着ピークの時間帯にバッジカウンターの隣でご利用になれます。', time: '3月26日(木) 8:10 AM', action: { label: 'サポートを開く', tab: 'help' } },
    { id: 'u3', type: 'venue', title: '南ロビーにWi-Fiと充電ステーションが準備されました', content: 'ネットワーク名は「SMX-ASPAC-2026」です。現在のパスコードはヘルプデスクでご確認ください。充電テーブルはHall 1ロビー近くのヘルプデスクの隣にあります。', time: '3月26日(木) 8:20 AM', action: { label: '詳細を確認する', tab: 'help' } },
    { id: 'u4', type: 'news', title: '今夜の見どころは、ウェルカム音楽と地区別写真です', content: '登録後の夕方のブロックは、ロビーでのマニラ伝統の短い歓迎ショーと地区ごとのグループ写真撮影が行われます。', time: '3月26日(木) 9:00 AM', action: { label: '今日の予定を見る', tab: 'schedule' } }
  ],
  'zh-TW': [
    { id: 'u1', type: 'urgent', title: '開幕典禮備用座位已開放', content: '與會者也可以到會議室 1 和 2 觀看現場轉播螢幕。工作人員將在主要大宴會廳入口處負責引導。', time: '3月26日(四) 7:30 AM', action: { label: '查看場地指南', tab: 'venue', venueLocationId: 'grand-ballroom' } },
    { id: 'u2', type: 'info', title: '報到處的語言服務台已開放', content: '在尖峰報到時間，名牌報到櫃檯旁提供英語、菲律賓語、日語與韓語的語言協助。', time: '3月26日(四) 8:10 AM', action: { label: '查看服務台', tab: 'help' } },
    { id: 'u3', type: 'venue', title: '大廳南側的 Wi-Fi 與充電站已備妥', content: '網路名稱是「SMX-ASPAC-2026」。目前的密碼請洽服務台。充電座位於一樓大廳的服務台旁邊。', time: '3月26日(四) 8:20 AM', action: { label: '查看幫助細節', tab: 'help' } },
    { id: 'u4', type: 'news', title: '今晚焦點將包括迎賓音樂與各區團體合照', content: '夜晚迎賓時段將在結束報到活動後於大廳舉行，首先會有一段短暫的馬尼拉傳統的迎賓文化表演以及各區的團體大合照。', time: '3月26日(四) 9:00 AM', action: { label: '查看今日議程', tab: 'schedule' } }
  ],
  ko: [
    { id: 'u1', type: 'urgent', title: '개막식 추가 좌석 이용 가능', content: '대표단은 라이브 중계 스크린이 설치된 미팅 룸 1과 2를 이용할 수 있습니다. 메인 볼룸 입구에서 안내 요원이 도와드립니다.', time: '3월 26일(목) 오전 7:30', action: { label: '장소 안내 열기', tab: 'venue', venueLocationId: 'grand-ballroom' } },
    { id: 'u2', type: 'info', title: '등록 데스크에 외국어 헬프 데스크 운영', content: '참석자 도착이 집중되는 시간대에 명찰 카운터 옆에서 영어, 타갈로그어, 일본어, 한국어 통역을 지원합니다.', time: '3월 26일(목) 오전 8:10', action: { label: '참석자 지원 보기', tab: 'help' } },
    { id: 'u3', type: 'venue', title: '남쪽 로비에 Wi-Fi 및 충전소 운영', content: '네트워크명은 \'SMX-ASPAC-2026\'입니다. 현재 비밀번호는 헬프 데스크에서 확인하세요. 충전 테이블은 홀 1 로비 헬프 데스크 옆에 있습니다.', time: '3월 26일(목) 오전 8:20', action: { label: '자세히 보기', tab: 'help' } },
    { id: 'u4', type: 'news', title: '오늘 밤 하이라이트: 환영 음악과 각 지구별 사진 촬영', content: '등록 행사 종료 후 저녁 환영 순서에서는 로비에서 진행되는 마닐라 문화 환영식과 각 지구별 단체 사진 촬영이 예정되어 있습니다.', time: '3월 26일(목) 오전 9:00', action: { label: '오늘 일정 보기', tab: 'schedule' } }
  ]
};

const baseVenueLocations = [
  { id: 'registration-desk', floor: 'Level 1', hall: 'Hall 1 Lobby', icon: 'registration' as const },
  { id: 'grand-ballroom', floor: 'Level 2', hall: 'Main Plenary Area', icon: 'plenary' as const },
  { id: 'help-desk', floor: 'Level 1', hall: 'Near Registration', icon: 'help' as const },
  { id: 'first-aid', floor: 'Level 1', hall: 'South Corridor', icon: 'first-aid' as const },
  { id: 'meal-hall', floor: 'Level 2', hall: 'Function Hall A', icon: 'dining' as const },
  { id: 'quiet-room', floor: 'Level 1', hall: 'West Hallway', icon: 'quiet' as const },
];

export const VENUE_LOCATIONS: Record<Language, VenueLocation[]> = {
  en: baseVenueLocations.map((v) => ({ ...v,
    ...(v.id === 'registration-desk' && { name: 'Registration and Badge Pickup', description: 'Badge release, printed programs, welcome kits, and the main information point for arriving delegates.', note: 'Best first stop for arrivals and anyone needing printed guidance.' }),
    ...(v.id === 'grand-ballroom' && { name: 'Grand Ballroom', description: 'Opening and closing ceremonies, large plenaries, and the House of Delegates session.', note: 'Follow blue overhead signs from the escalators.' }),
    ...(v.id === 'help-desk' && { name: 'Pulse and Help Desk', description: 'General questions, language support, lost-and-found guidance, and directions to session rooms.', note: 'Look for volunteers in blue ASPAC helper sashes.' }),
    ...(v.id === 'first-aid' && { name: 'First Aid and Wellness Room', description: 'Medical support, wheelchairs, and a quiet seat for delegates who need a short rest.', note: 'Ask any usher if you need an escort.' }),
    ...(v.id === 'meal-hall' && { name: 'Meal Hall', description: 'Lunch service, coffee stations, and afternoon snacks during official break windows.', note: 'Bring your badge to help volunteers move lines faster.' }),
    ...(v.id === 'quiet-room' && { name: 'Prayer and Quiet Room', description: 'A calm room for prayer, quiet reflection, or a few minutes away from the busy main halls.', note: 'Please keep phones on silent inside the room.' }),
  })),
  tl: baseVenueLocations.map((v) => ({ ...v,
    ...(v.id === 'registration-desk' && { name: 'Rehistrasyon at Pagkuha ng Badge', description: 'Pagkuha ng badge, nakalimbag na programa, welcome kits, at pangunahing tulong sa impormasyon.', note: 'Ito ang unang dapat daanan ng mga bagong dating na delegado.' }),
    ...(v.id === 'grand-ballroom' && { name: 'Grand Ballroom', description: 'Pambungad at pagsasara na seremonya, malalaking pagtitipon, at House of Delegates session.', note: 'Sundan ang mga asul na sign mula sa escalators.' }),
    ...(v.id === 'help-desk' && { name: 'Pulse at Help Desk', description: 'Mga pangkalahatang tanong, tulong sa wika, lost-and-found, at direksyon sa mga silid.', note: 'Hanapin ang mga volunteers na nakasuot ng asul.' }),
    ...(v.id === 'first-aid' && { name: 'First Aid at Wellness Room', description: 'Tulong medikal, wheelchair, at tahimik na upuan para sa mga delegadong nangangailangan magpahinga.', note: 'Humingi ng tulong sa kahit sinong usher.' }),
    ...(v.id === 'meal-hall' && { name: 'Lugar ng Pagkainan', description: 'Tanghalian, kape, at meryenda sa mga opisyal na break time.', note: 'Ipakita ang iyong badge upang madali ang pila.' }),
    ...(v.id === 'quiet-room' && { name: 'Prayer and Quiet Room', description: 'Tahimik na kwarto para magdasal at magbulay-bulay na malayo sa maingay na hall.', note: 'Mangyaring ilagay sa silent mode ang mga telepono sa loob.' }),
  })),
  ja: baseVenueLocations.map((v) => ({ ...v,
    ...(v.id === 'registration-desk' && { name: '登録とバッジの受け取り', description: 'バッジの発行、印刷されたプログラムとウェルカムキットの配布、および到着時のメイン情報デスクです。', note: '到着時に最初に向かう場所です。' }),
    ...(v.id === 'grand-ballroom' && { name: 'グランドボールルーム', description: '開会式・閉会式、大規模な本会議、および代議員会が行われる場所です。', note: 'エスカレーターからの青い頭上看板に従ってください。' }),
    ...(v.id === 'help-desk' && { name: 'Pulse & ヘルプデスク', description: '一般的な質問、通訳補助、遺失物、セッションルームへの道案内を提供します。', note: '青いタスキを掛けたボランティアにお声掛けください。' }),
    ...(v.id === 'first-aid' && { name: '救護室 (First Aid & Wellness Room)', description: '医療品、車椅子、少しの休息を必要とする参加者のための静かな席を提供します。', note: 'エスコートが必要な場合は案内係にお尋ねください。' }),
    ...(v.id === 'meal-hall' && { name: 'ダイニングホール (Meal Hall)', description: '公式の休憩時間中の昼食、コーヒーステーション、午後のおやつが提供されます。', note: '列の混雑を防ぐためバッジを提示してください。' }),
    ...(v.id === 'quiet-room' && { name: '祈りと休息の部屋 (Quiet Room)', description: 'お祈りや静かな時間を過ごすための、にぎやかなホールから離れた落ち着いた部屋です。', note: '室内ではスマートフォンをマナーモードに設定してください。' }),
  })),
  'zh-TW': baseVenueLocations.map((v) => ({ ...v,
    ...(v.id === 'registration-desk' && { name: '報到處與領證區', description: '名牌發放、會議手冊、歡迎包領取，這是抵達與會者的主要服務點。', note: '請將這裡作為您抵達會場的第一站。' }),
    ...(v.id === 'grand-ballroom' && { name: '大宴會廳 (Grand Ballroom)', description: '開幕和閉幕典禮、大型大會會議，與 ASPAC 首席代表會議。', note: '請沿著手扶梯上方的藍色標誌前往。' }),
    ...(v.id === 'help-desk' && { name: 'Pulse 服務中心', description: '常見問題、語言服務、失物招領以及所有會議室的方位引導。', note: '請尋找佩戴藍色 ASPAC 臂帶/肩帶的志工。' }),
    ...(v.id === 'first-aid' && { name: '醫護室 (First Aid)', description: '醫療支援、輪椅借用服務，並提供給需要短暫休息的與會者一個安靜的空間。', note: '若需要陪伴引導請詢問任何招待人員。' }),
    ...(v.id === 'meal-hall' && { name: '用餐區', description: '於大會官方休息時段提供午餐、咖啡與下午茶點心。', note: '為了加速進入排隊動線，請準備好您的與會名牌。' }),
    ...(v.id === 'quiet-room' && { name: '祈禱與安靜休息室', description: '提供給祈禱、安靜沉澱，或短暫遠離會場喧囂的寧靜房間。', note: '室內請將手機切換至靜音模式。' }),
  })),
  ko: baseVenueLocations.map((v) => ({ ...v,
    ...(v.id === 'registration-desk' && { name: '등록 및 명찰 수령', description: '명찰 배포, 인쇄된 프로그램, 웰컴 키트 증정 등 참석자들을 위한 주요 정보 제공처.', note: '도착 시 가장 먼저 방문해야 할 곳입니다.' }),
    ...(v.id === 'grand-ballroom' && { name: '그랜드 볼룸', description: '개폐막식, 대형 본회의, 그리고 대의원 회의가 열리는 장소.', note: '에스컬레이터에서 파란색 안내 표지판을 따라가세요.' }),
    ...(v.id === 'help-desk' && { name: 'Pulse & 헬프 데스크', description: '일반적인 질문, 통역 지원, 분실물 찾기 및 회의실 방향 안내.', note: '파란색 ASPAC 도우미 띠를 두른 자원봉사자에게 문의하세요.' }),
    ...(v.id === 'first-aid' && { name: '의무실 및 휴게실', description: '의료 지원, 휠체어 대여 및 짧은 휴식이 필요한 참석자를 위한 조용한 공간.', note: '동행이 필요한 경우 안내 요원에게 요청하세요.' }),
    ...(v.id === 'meal-hall' && { name: '다이닝 홀(식당)', description: '공식 휴게 시간 동안 점심 식사, 커피, 오후 스낵이 제공되는 곳.', note: '입장 줄을 빠르게 서기 위해 귀하의 명찰을 제시해 주세요.' }),
    ...(v.id === 'quiet-room' && { name: '기도 및 묵상실', description: '기도, 조용한 명상, 혼잡한 로비를 벗어나 휴식을 취할 수 있는 차분한 방.', note: '방 안에서는 전화기를 무음 모드로 유지해 주세요.' }),
  })),
};

export const FAQS: Record<Language, FAQ[]> = {
  en: [
    { id: 'faq-1', category: 'General', question: 'Where should I go first when I arrive?', answer: 'Go to Registration and Badge Pickup at Hall 1 Lobby. Staff there can also point you to the Help Desk and the nearest escalator.' },
    { id: 'faq-2', category: 'General', question: 'Does Pulse replace official convention notices?', answer: 'No. Pulse is a public companion for quick access. Official announcements, on-site signage, and stage notices remain the final source of truth.' },
    { id: 'faq-3', category: 'Venue', question: 'Where is the Help Desk?', answer: 'The Help Desk is on Level 1 near Registration. It handles venue directions, simple app help, and language support.' },
    { id: 'faq-4', category: 'Venue', question: 'Is there a quiet place to rest or pray?', answer: 'Yes. A Prayer and Quiet Room is open on Level 1 along the west hallway. Volunteers can escort you if needed.' },
    { id: 'faq-5', category: 'Logistics', question: 'What Wi-Fi should I use?', answer: 'Use network SMX-ASPAC-2026. Ask the Help Desk for the current passcode. Charging tables are beside the Help Desk.' },
    { id: 'faq-6', category: 'Logistics', question: 'What should I bring with me each day?', answer: 'Bring your delegate badge, a light jacket for air-conditioned rooms, a portable charger, and any medicine you may need during the day.' },
    { id: 'faq-7', category: 'Dress Code', question: 'What is the recommended dress code?', answer: 'Smart business attire is recommended for daytime sessions. For fellowship night, formal wear or national dress is welcome.' },
    { id: 'faq-8', category: 'Language', question: 'Is language help available?', answer: 'Yes. English, Filipino, Japanese, and Korean support is available at the Help Desk near Registration during busy delegate hours.' }
  ],
  tl: [
    { id: 'faq-1', category: 'General', question: 'Saan ako unang pupunta pagdating?', answer: 'Pumunta sa Registration at Badge Pickup sa Hall 1 Lobby. Ituturo din ng mga staff doon kung saan ang Help Desk.' },
    { id: 'faq-2', category: 'General', question: 'Pinapalitan ba ng Pulse ang opisyal na convention notices?', answer: 'Hindi. Ang Pulse ay isang pangkalahatang gabay lang. Mananatiling opisyal kung ano ang sasabihin sa stage at naka-paskil na karatula.' },
    { id: 'faq-3', category: 'Venue', question: 'Nasaan ang Help Desk?', answer: 'Nasa Level 1 malapit sa Registration. Dito ay sasagutin ang mga katanungan sa direksyon at iba pa.' },
    { id: 'faq-4', category: 'Venue', question: 'May tahimik bang lugar para maka-pahinga o mag-dasal?', answer: 'Meron. Ang Prayer and Quiet Room ay nasa Level 1. Magtanong lang sa mga volunteers kung paano makapunta.' },
    { id: 'faq-5', category: 'Logistics', question: 'Anong Wi-Fi ang is-sign-in ko?', answer: 'Ang network ay SMX-ASPAC-2026. Kunin ang kasalukuyang passcode sa Help Desk. May saksakan malapit sa Help Desk.' },
    { id: 'faq-6', category: 'Logistics', question: 'Ano ang mga dapat kong dalhin araw-araw?', answer: 'Dalhin niyo ang delegate badge, magaan na jacket, charger, at ang mga kailangan niyong gamot.' },
    { id: 'faq-7', category: 'Dress Code', question: 'Paano ang pinapayong kasuotan?', answer: 'Smart business attire sa araw. Pormal o pambansang kasuotan (national dress) sa fellowship night.' },
    { id: 'faq-8', category: 'Language', question: 'May tutulong ba kapag magulo ang lenggwahe?', answer: 'Oo. Bukas ang mga interpreters sa English, Filipino, Japanese, at Korean malapit sa Registration.' }
  ],
  ja: [
    { id: 'faq-1', category: 'General', question: '到着したらまずどこへ行けばよいですか？', answer: 'ホール1ロビーの登録・バッジ受け取り窓口へお進みください。近くにいるスタッフがヘルプデスクの場所をご案内します。' },
    { id: 'faq-2', category: 'General', question: 'Pulseの案内は公式通知の代わりになりますか？', answer: 'いいえ。Pulseは利便性のためのコンパニオンアプリです。ステージのアナウンスや印刷物、看板の表示が最終的な公式情報となります。' },
    { id: 'faq-3', category: 'Venue', question: 'ヘルプデスクはどこですか？', answer: 'レベル1の登録受付の近くにあります。道案内やアプリの簡単な使い方の説明、通訳サポートを行っています。' },
    { id: 'faq-4', category: 'Venue', question: '休憩や祈りのための静かな場所はありますか？', answer: 'はい。レベル1の西側廊下に「祈りと休息の部屋」が開設されています。ボランティアがご案内することも可能です。' },
    { id: 'faq-5', category: 'Logistics', question: 'どのWi-Fiを利用すればよいですか？', answer: 'ネットワーク「SMX-ASPAC-2026」をご利用ください。現在のパスコードはヘルプデスクでご確認ください。充電テーブルはヘルプデスクの脇にあります。' },
    { id: 'faq-6', category: 'Logistics', question: '毎日何を持参すべきですか？', answer: '参加者バッジ、エアコン対策の上着、ポータブル充電器、そしてご自身で日中に必要となる薬を持参してください。' },
    { id: 'faq-7', category: 'Dress Code', question: '推奨される服装は何ですか？', answer: '日中のセッションではスマートビジネスがお勧めです。夜の懇親会ではフォーマルウェアや各国の民族衣装も歓迎します。' },
    { id: 'faq-8', category: 'Language', question: '通訳サポートはありますか？', answer: 'はい。参加者が集中する時間帯には、登録受付近くのヘルプデスクにて英語、タガログ語、日本語、韓国語のサポートを提供しています。' }
  ],
  'zh-TW': [
    { id: 'faq-1', category: 'General', question: '抵達時我應該先去哪裡？', answer: '請前往一樓大廳的報到處領取名牌。那裡的工作人員也能指引您前往服務台與最近的手扶梯。' },
    { id: 'faq-2', category: 'General', question: 'Pulse 的資訊可以取代官方大會公告嗎？', answer: '不能。Pulse 是一個供您快速訪問的指南。主辦單位的舞台公告、書面通知和現場標誌始終是最終的正確資訊來源。' },
    { id: 'faq-3', category: 'Venue', question: '服務台在哪裡？', answer: '服務台位於一樓報到處附近。提供場地指引、簡單的應用程式幫助解答以及語言支援服務。' },
    { id: 'faq-4', category: 'Venue', question: '有沒有安靜休息或祈禱的地方？', answer: '有的。一樓西側走廊設有祈禱與安靜休息室。如果需要，現場志工可以陪同您前往。' },
    { id: 'faq-5', category: 'Logistics', question: '我應該連接哪個 Wi-Fi 網絡？', answer: '請連接「SMX-ASPAC-2026」網路。請向服務台索取目前的密碼。充電桌位於服務台旁邊。' },
    { id: 'faq-6', category: 'Logistics', question: '第一天我應該攜帶哪些物品？', answer: '請務必配戴與會名牌，帶上一件薄外套以適應會場空調，攜帶行動電源，以及您個人日間可能需要的任何藥品。' },
    { id: 'faq-7', category: 'Dress Code', question: '建議的服儀規定為何？', answer: '白天的會議建議穿著商務便服（Smart business attire）。在晚間的交流活動中，歡迎穿著正式服裝或各國傳統民族服飾。' },
    { id: 'faq-8', category: 'Language', question: '提供語言支援嗎？', answer: '有的。在報到尖峰時段，我們於報到處附近的服務台提供英語、菲律賓語、日語與韓語的語言協助。' }
  ],
  ko: [
    { id: 'faq-1', category: 'General', question: '도착 시 제일 먼저 어디로 가야 하나요?', answer: '홀 1 로비에 있는 등록 및 명찰 수령처로 가십시오. 직원이 헬프 데스크와 에스컬레이터의 위치도 친절히 안내해 드립니다.' },
    { id: 'faq-2', category: 'General', question: 'Pulse 앱이 공식 컨벤션 공지를 대체하나요?', answer: '아닙니다. Pulse는 빠른 정보 확인을 위한 지원 앱입니다. 공식 발표, 현장 표지판, 무대 공지가 최종적인 확인 기준이 됩니다.' },
    { id: 'faq-3', category: 'Venue', question: '헬프 데스크는 어디에 있나요?', answer: '헬프 데스크는 1층 등록처 근처에 있습니다. 동선 안내, 앱 이용 관련 도움, 그리고 통역 지원을 제공합니다.' },
    { id: 'faq-4', category: 'Venue', question: '휴식을 취하거나 기도할 수 있는 조용한 공간이 있나요?', answer: '네. 1층 서쪽 복도에 기도 및 묵상실이 마련되어 있습니다. 필요하다면 자원봉사자가 동행할 수 있습니다.' },
    { id: 'faq-5', category: 'Logistics', question: '어떤 Wi-Fi를 사용해야 하나요?', answer: '네트워크는 \'SMX-ASPAC-2026\'을 사용하세요. 현재 비밀번호는 헬프 데스크에서 확인하세요. 충전 테이블은 헬프 데스크 쪽에 있습니다.' },
    { id: 'faq-6', category: 'Logistics', question: '매일 무엇을 가져와야 하나요?', answer: '참석자 명찰, 에어컨을 대비한 얇은 겉옷, 휴대용 충전기 및 낮 동안 복용해야 하는 필수 의약품을 지참하세요.' },
    { id: 'faq-7', category: 'Dress Code', question: '권장되는 복장(Dress Code)은 무엇인가요?', answer: '낮 동안의 회의에는 단정한 비즈니스 캐주얼이 권장됩니다. 저녁 환영 및 교류 행사에는 정장이나 민족 의상(전통 의상) 착용을 환영합니다.' },
    { id: 'faq-8', category: 'Language', question: '언어 지원이 가능한가요?', answer: '네. 등록 피크 시간대에는 등록 데스크 근처의 헬프 데스크에서 영어, 타갈로그어, 일본어, 한국어 통역을 도와드립니다.' }
  ]
};
