import { createContext, useContext } from 'react';

export type Language = 'en' | 'tl' | 'ja' | 'zh-TW' | 'ko';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  tl: 'Filipino',
  ja: '日本語',
  'zh-TW': '繁體中文',
  ko: '한국어',
};

export type Dictionary = {
  // Tabs
  tabToday: string;
  tabSchedule: string;
  tabUpdates: string;
  tabVenue: string;
  tabHelp: string;

  // Header & Home
  appTitle: string;
  appSubtitle: string;
  mabuhay: string;
  welcomeHeading: string;
  welcomeDesc: string;
  btnTodaySchedule: string;
  btnSavedSessions: string;
  btnUpdates: string;
  btnVenueGuide: string;

  // Cards
  cardWifiTitle: string;
  cardWifiSub: string;
  cardWifiAction: string;
  cardLangTitle: string;
  cardLangSub: string;
  cardLangAction: string;
  cardHelpTitle: string;
  cardHelpSub: string;
  cardHelpAction: string;
  cardBringTitle: string;
  cardBringSub: string;
  cardBringAction: string;

  // Sections
  importantUpdate: string;
  happeningNow: string;
  fullSchedule: string;
  liveNow: string;
  upNext: string;
  noLiveSessions: string;
  useFullSchedule: (dayLabel: string) => string;
  mySchedule: string;
  openSaved: string;
  saveSessions: string;
  noSavedSessions: string;
  bookmarkHint: string;
  officialNoteTag: string;
  officialNoteDesc: string;

  // Schedule View
  scheduleDesc: string;

  // Actions
  directions: string;
  openMap: (venueName: string) => string;
  speakers: string;
  attendeeReminderTag: string;
  attendeeReminderDesc: string;

  // Toasts
  toastRemoved: string;
  toastSaved: string;
  toastCopyFailed: string;
  toastSessionShared: string;
  toastSessionCopied: string;
  toastWifiCopied: string;
  toastVenueCopied: string;
};

export const DICTIONARIES: Record<Language, Dictionary> = {
  en: {
    tabToday: 'Today',
    tabSchedule: 'Schedule',
    tabUpdates: 'Updates',
    tabVenue: 'Venue',
    tabHelp: 'Help',
    appTitle: 'Pulse',
    appSubtitle: 'ASPAC Manila 2026',
    mabuhay: 'Mabuhay',
    welcomeHeading: 'Welcome to the Kiwanis ASPAC Manila 2026 companion.',
    welcomeDesc: 'Pulse helps you find today’s schedule, room locations, urgent announcements, and practical attendee help in one place.',
    btnTodaySchedule: 'Today’s schedule',
    btnSavedSessions: 'Saved sessions',
    btnUpdates: 'Updates',
    btnVenueGuide: 'Venue guide',
    cardWifiTitle: 'Wi-Fi',
    cardWifiSub: 'SMX-ASPAC-2026',
    cardWifiAction: 'Copy SSID',
    cardLangTitle: 'Language support',
    cardLangSub: 'English, Filipino, Japanese, Korean',
    cardLangAction: 'Open help',
    cardHelpTitle: 'Help Desk',
    cardHelpSub: 'Level 1 near Registration',
    cardHelpAction: 'Open venue',
    cardBringTitle: 'What to bring',
    cardBringSub: 'Badge, jacket, charger, medicine',
    cardBringAction: 'Read FAQ',
    importantUpdate: 'Important update',
    happeningNow: 'Happening now',
    fullSchedule: 'Full schedule',
    liveNow: 'Live now',
    upNext: 'Up next',
    noLiveSessions: 'No live sessions at this hour.',
    useFullSchedule: (dayLabel) => `Use the full schedule to check the next block for ${dayLabel}.`,
    mySchedule: 'My Schedule',
    openSaved: 'Open saved',
    saveSessions: 'Save sessions',
    noSavedSessions: 'No saved sessions yet.',
    bookmarkHint: 'Tap the bookmark in the schedule to keep important sessions easy to find.',
    officialNoteTag: 'Official note',
    officialNoteDesc: 'Pulse complements official convention information. Please still follow stage announcements, printed notices, and on-site signage from organizers.',
    scheduleDesc: 'Tap a session to see details or save it for later.',
    directions: 'Directions',
    openMap: (name) => `Open ${name} map`,
    speakers: 'Speakers',
    attendeeReminderTag: 'Attendee reminder',
    attendeeReminderDesc: 'Presentation files and late room changes depend on official organizers. Use Pulse for quick access, then confirm with stage announcements and posted signs.',
    toastRemoved: 'Removed from My Schedule.',
    toastSaved: 'Saved to My Schedule.',
    toastCopyFailed: 'Copy failed on this device.',
    toastSessionShared: 'Session link shared.',
    toastSessionCopied: 'Session link copied.',
    toastWifiCopied: 'Wi-Fi SSID copied.',
    toastVenueCopied: 'Venue address copied.',
  },
  tl: {
    tabToday: 'Ngayon',
    tabSchedule: 'Iskedyul',
    tabUpdates: 'Updates',
    tabVenue: 'Lugar',
    tabHelp: 'Tulong',
    appTitle: 'Pulse',
    appSubtitle: 'ASPAC Manila 2026',
    mabuhay: 'Mabuhay',
    welcomeHeading: 'Maligayang pagdating sa Kiwanis ASPAC Manila 2026 companion.',
    welcomeDesc: 'Tinutulungan ka ng Pulse na hanapin ang iskedyul, lokasyon ng mga kuwarto, mahahalagang anunsyo, at tulong para sa mga delegado sa iisang lugar.',
    btnTodaySchedule: 'Iskedyul Ngayon',
    btnSavedSessions: 'Aking Iskedyul',
    btnUpdates: 'Updates',
    btnVenueGuide: 'Gabay sa Lugar',
    cardWifiTitle: 'Wi-Fi',
    cardWifiSub: 'SMX-ASPAC-2026',
    cardWifiAction: 'Kopyahin ang SSID',
    cardLangTitle: 'Tulong sa Wika',
    cardLangSub: 'English, Filipino, Japanese, Korean',
    cardLangAction: 'Buksan',
    cardHelpTitle: 'Help Desk',
    cardHelpSub: 'Level 1 malapit sa Registration',
    cardHelpAction: 'Tingnan ang Lugar',
    cardBringTitle: 'Mga Dadalhin',
    cardBringSub: 'Badge, jacket, charger, gamot',
    cardBringAction: 'Basahin ang FAQ',
    importantUpdate: 'Mahalagang update',
    happeningNow: 'Kasalukuyang nagaganap',
    fullSchedule: 'Buong iskedyul',
    liveNow: 'Live ngayon',
    upNext: 'Susunod',
    noLiveSessions: 'Walang live sessions sa oras na ito.',
    useFullSchedule: (dayLabel) => `Gamitin ang buong iskedyul para makita ang susunod na mangyayari para sa ${dayLabel}.`,
    mySchedule: 'Aking Iskedyul',
    openSaved: 'Buksan',
    saveSessions: 'I-save',
    noSavedSessions: 'Wala pang na-save na sessions.',
    bookmarkHint: 'I-tap ang bookmark para madaling balikan ang mahahalagang session.',
    officialNoteTag: 'Opisyal na Paalala',
    officialNoteDesc: 'Ang Pulse ay gabay lamang. Mangyaring sundin pa rin ang mga opisyal na anunsyo sa entablado at mga karatula mula sa organizers.',
    scheduleDesc: 'I-tap ang session para sa detalye o para i-save ito.',
    directions: 'Direksyon',
    openMap: (name) => `Buksan ang ${name} map`,
    speakers: 'Mga Tagapagsalita',
    attendeeReminderTag: 'Paalala sa Delegado',
    attendeeReminderDesc: 'Ang mga presentation files at pagbabago ng kuwarto ay nakadepende sa organizers. Gamitin ang Pulse bilang gabay, pero makinig sa anunsyo.',
    toastRemoved: 'Naalis mula sa Aking Iskedyul.',
    toastSaved: 'Na-save sa Aking Iskedyul.',
    toastCopyFailed: 'Nabigo ang pag-copy sa device na ito.',
    toastSessionShared: 'Na-share na ang session link.',
    toastSessionCopied: 'Na-copy ang session link.',
    toastWifiCopied: 'Wi-Fi SSID copied.',
    toastVenueCopied: 'Venue address copied.',
  },
  ja: {
    tabToday: '今日',
    tabSchedule: 'スケジュール',
    tabUpdates: 'お知らせ',
    tabVenue: '会場',
    tabHelp: 'ヘルプ',
    appTitle: 'Pulse',
    appSubtitle: 'ASPAC Manila 2026',
    mabuhay: 'Mabuhay (ようこそ)',
    welcomeHeading: 'キワニス ASPAC マニラ 2026 コンパニオンへようこそ。',
    welcomeDesc: 'Pulseでは、今日のスケジュール、部屋の場所、緊急のお知らせ、参加者向けのサポートを1か所で確認できます。',
    btnTodaySchedule: '今日のスケジュール',
    btnSavedSessions: '保存したセッション',
    btnUpdates: 'お知らせ',
    btnVenueGuide: '会場ガイド',
    cardWifiTitle: 'Wi-Fi',
    cardWifiSub: 'SMX-ASPAC-2026',
    cardWifiAction: 'SSIDをコピー',
    cardLangTitle: '言語サポート',
    cardLangSub: '英語、タガログ語、日本語、韓国語',
    cardLangAction: 'ヘルプを開く',
    cardHelpTitle: 'ヘルプデスク',
    cardHelpSub: 'Level 1 (登録受付付近)',
    cardHelpAction: '会場を開く',
    cardBringTitle: '持ち物',
    cardBringSub: 'バッジ、上着、充電器、薬',
    cardBringAction: 'FAQを読む',
    importantUpdate: '重要なお知らせ',
    happeningNow: '開催中',
    fullSchedule: '全スケジュール',
    liveNow: '進行中',
    upNext: '次は',
    noLiveSessions: 'この時間のセッションはありません。',
    useFullSchedule: (dayLabel) => `全スケジュールから${dayLabel}の予定を確認してください。`,
    mySchedule: 'マイスケジュール',
    openSaved: '開く',
    saveSessions: '保存',
    noSavedSessions: '保存されたセッションはありません。',
    bookmarkHint: 'スケジュールのブックマークをタップすると、重要なセッションを簡単に見つけられます。',
    officialNoteTag: '公式メモ',
    officialNoteDesc: 'Pulseは公式の案内を補足するものです。ステージのアナウンスや印刷物の掲示などの公式情報も必ず確認してください。',
    scheduleDesc: 'セッションをタップして詳細を確認、または保存します。',
    directions: '経路',
    openMap: (name) => `${name} のマップを開く`,
    speakers: '登壇者',
    attendeeReminderTag: '参加者へのリマインダー',
    attendeeReminderDesc: 'プレゼン資料や直前の部屋の変更は主催者に依存します。Pulseで確認した後は、必ず会場のアナウンスも確認してください。',
    toastRemoved: 'マイスケジュールから削除しました。',
    toastSaved: 'マイスケジュールに保存しました。',
    toastCopyFailed: 'このデバイスでのコピーに失敗しました。',
    toastSessionShared: 'セッションリンクを共有しました。',
    toastSessionCopied: 'セッションリンクをコピーしました。',
    toastWifiCopied: 'Wi-FiのSSIDをコピーしました。',
    toastVenueCopied: '会場の住所をコピーしました。',
  },
  'zh-TW': {
    tabToday: '今天',
    tabSchedule: '議程',
    tabUpdates: '最新消息',
    tabVenue: '場地',
    tabHelp: '幫助',
    appTitle: 'Pulse',
    appSubtitle: 'ASPAC Manila 2026',
    mabuhay: 'Mabuhay (歡迎)',
    welcomeHeading: '歡迎使用國際同濟會 ASPAC 馬尼拉 2026 指南。',
    welcomeDesc: 'Pulse 可幫助您在同一個地方找到今天的議程、房間位置、緊急公告以及實用的與會者幫助。',
    btnTodaySchedule: '今日議程',
    btnSavedSessions: '已保存議程',
    btnUpdates: '最新消息',
    btnVenueGuide: '場地指南',
    cardWifiTitle: 'Wi-Fi',
    cardWifiSub: 'SMX-ASPAC-2026',
    cardWifiAction: '複製 SSID',
    cardLangTitle: '語言支援',
    cardLangSub: '英語、菲律賓語、日語、韓語',
    cardLangAction: '打開幫助',
    cardHelpTitle: '服務台',
    cardHelpSub: '1樓（報名處附近）',
    cardHelpAction: '查看場地',
    cardBringTitle: '攜帶物品',
    cardBringSub: '名牌、外套、充電器、藥品',
    cardBringAction: '閱讀常見問題',
    importantUpdate: '重要公告',
    happeningNow: '正在進行',
    fullSchedule: '完整議程',
    liveNow: '進行中',
    upNext: '接下來',
    noLiveSessions: '此時段沒有正在進行的會議。',
    useFullSchedule: (dayLabel) => `請查看完整議程以了解 ${dayLabel} 的下一個時段。`,
    mySchedule: '我的議程',
    openSaved: '打開已保存',
    saveSessions: '儲存議程',
    noSavedSessions: '尚未儲存任何議程。',
    bookmarkHint: '點擊議程中的書籤，可以輕鬆找到重要的會議。',
    officialNoteTag: '官方提醒',
    officialNoteDesc: 'Pulse 僅作為官方資訊的補充。請務必遵守主辦單位的舞台公告、書面通知和現場標誌。',
    scheduleDesc: '點擊會議以查看詳細資訊或稍後儲存。',
    directions: '導航',
    openMap: (name) => `打開 ${name} 地圖`,
    speakers: '講者',
    attendeeReminderTag: '與會者提醒',
    attendeeReminderDesc: '簡報檔案及臨時的房間異動取決於主辦單位。使用 Pulse 快速查詢後，請務必與現場公告確認。',
    toastRemoved: '已從「我的議程」中移除。',
    toastSaved: '已儲存至「我的議程」。',
    toastCopyFailed: '此裝置上複製失敗。',
    toastSessionShared: '會議連結已分享。',
    toastSessionCopied: '會議連結已複製。',
    toastWifiCopied: 'Wi-Fi SSID 已複製。',
    toastVenueCopied: '場地地址已複製。',
  },
  ko: {
    tabToday: '오늘',
    tabSchedule: '일정',
    tabUpdates: '공지사항',
    tabVenue: '장소',
    tabHelp: '도움말',
    appTitle: 'Pulse',
    appSubtitle: 'ASPAC Manila 2026',
    mabuhay: 'Mabuhay (환영합니다)',
    welcomeHeading: '국제키와니스 ASPAC 마닐라 2026 컴패니언에 오신 것을 환영합니다.',
    welcomeDesc: 'Pulse를 통해 오늘의 일정, 회의실 위치, 긴급 공지사항, 참석자 지원을 한 곳에서 확인할 수 있습니다.',
    btnTodaySchedule: '오늘의 일정',
    btnSavedSessions: '저장된 일정',
    btnUpdates: '공지사항',
    btnVenueGuide: '장소 안내',
    cardWifiTitle: 'Wi-Fi',
    cardWifiSub: 'SMX-ASPAC-2026',
    cardWifiAction: 'SSID 복사',
    cardLangTitle: '언어 지원',
    cardLangSub: '영어, 타갈로그어, 일본어, 한국어',
    cardLangAction: '도움말 열기',
    cardHelpTitle: '헬프 데스크',
    cardHelpSub: '1층 등록처 근처',
    cardHelpAction: '장소 열기',
    cardBringTitle: '준비물',
    cardBringSub: '명찰, 겉옷, 충전기, 비상약',
    cardBringAction: 'FAQ 읽기',
    importantUpdate: '중요 업데이트',
    happeningNow: '현재 진행 중',
    fullSchedule: '전체 일정',
    liveNow: '진행 중',
    upNext: '다음 일정',
    noLiveSessions: '현재 진행 중인 세션이 없습니다.',
    useFullSchedule: (dayLabel) => `전체 일정을 통해 ${dayLabel}의 다음 블록을 확인하세요.`,
    mySchedule: '내 일정',
    openSaved: '열기',
    saveSessions: '저장',
    noSavedSessions: '저장된 세션이 없습니다.',
    bookmarkHint: '일정에서 북마크를 탭하여 중요한 세션을 쉽게 찾을 수 있습니다.',
    officialNoteTag: '공식 안내',
    officialNoteDesc: 'Pulse는 공식 컨벤션 정보를 보완합니다. 주최측의 무대 공지, 인쇄된 안내문, 현장 표지판을 반드시 확인해 주세요.',
    scheduleDesc: '세션을 탭하여 세부 정보를 확인하거나 나중을 위해 저장하세요.',
    directions: '길찾기',
    openMap: (name) => `${name} 지도 열기`,
    speakers: '발표자',
    attendeeReminderTag: '참석자 알림',
    attendeeReminderDesc: '발표 자료나 갑작스러운 회의실 변경은 주최측의 일정에 따릅니다. Pulse를 참조하되 현장 공지와 표지판을 반드시 확인해 주세요.',
    toastRemoved: '내 일정에서 삭제되었습니다.',
    toastSaved: '내 일정에 저장되었습니다.',
    toastCopyFailed: '이 기기에서 복사에 실패했습니다.',
    toastSessionShared: '세션 링크가 공유되었습니다.',
    toastSessionCopied: '세션 링크가 복사되었습니다.',
    toastWifiCopied: 'Wi-Fi SSID가 복사되었습니다.',
    toastVenueCopied: '장소 주소가 복사되었습니다.',
  },
};

export const I18nContext = createContext<{ language: Language; t: Dictionary }>({
  language: 'en',
  t: DICTIONARIES.en,
});

export function useI18n() {
  return useContext(I18nContext);
}
