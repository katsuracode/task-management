import type { Project } from '../types'

export const samples: Project[] = [
  {
    id: 5001,
    title: '期末レポート作成',
    description: 'プログラミング演習の期末レポート作成プロジェクト',
    date: '2024-12-15',
    taskList: [
      { id: 6001, description: 'レポートのテーマを決める' },
      { id: 6002, description: '参考文献を集める' },
      { id: 6003, description: 'アウトラインを作成' },
      { id: 6004, description: '序論・本文・結論を執筆' },
      { id: 6005, description: '参考文献リストを作成' },
      { id: 6006, description: '誤字脱字をチェック' },
      { id: 6007, description: '提出期限に間に合うように印刷・提出' },
    ],
  },
  {
    id: 5002,
    title: 'グループ研究発表',
    description: 'ゼミのグループ研究発表の準備プロジェクト',
    date: '2024-11-30',
    taskList: [
      { id: 6008, description: 'グループメンバーとテーマ決定' },
      { id: 6009, description: '役割分担を決める' },
      { id: 6010, description: 'リサーチと資料収集' },
      { id: 6011, description: '発表スライドを作成' },
      { id: 6012, description: '発表原稿を準備' },
      { id: 6013, description: 'リハーサルを実施' },
      { id: 6014, description: 'フィードバックを反映' },
      { id: 6015, description: '本番発表' },
    ],
  },
  {
    id: 5003,
    title: 'アルバイトシフト管理',
    description: '週末のアルバイトのシフト管理と準備プロジェクト',
    date: '2024-11-28',
    taskList: [
      { id: 6016, description: '来週のシフトを確認' },
      { id: 6017, description: '必要な持ち物リストを作成' },
      { id: 6018, description: 'ユニフォームを洗濯' },
      { id: 6019, description: '交通費の計算' },
      { id: 6020, description: '前日に早めに寝る' },
      { id: 6021, description: '出勤前の最終チェック' },
      { id: 6022, description: '業務後の振り返り' },
    ],
  },
]
