
export interface SeismographQuestion {
  id: number
  prompt: string
  options: readonly {
    id: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
  answer: 'A' | 'B' | 'C' | 'D'
  explanation: string
}

export const seismographQuestions:
  readonly SeismographQuestion[] = [
  {
    id: 1,
    prompt:
      'Hiện tượng cộng hưởng cơ học thường mang lại tác hại làm phá hủy kết cấu (như sập cầu, gãy móng nhà), nhưng đôi khi nó cũng được ứng dụng hữu ích. Đâu là một ứng dụng có lợi của sự cộng hưởng?',
    options: [
      {
        id: 'A',
        text: 'Thiết kế bộ giảm xóc cho ô tô.',
      },
      {
        id: 'B',
        text: 'Chế tạo hộp đàn ghi-ta (hộp cộng hưởng).',
      },
      {
        id: 'C',
        text: 'Xây dựng các bộ cản rung lắc cho tòa nhà chọc trời.',
      },
      {
        id: 'D',
        text: 'Chế tạo máy đo địa chấn.',
      },
    ],
    answer: 'B',
    explanation:
      'Đúng! Hộp đàn ghi-ta, violin hay các nhạc cụ có dây khác được thiết kế với tần số riêng phù hợp để cộng hưởng với dao động của dây đàn, giúp khuếch đại âm thanh to và vang hơn. Các phương án A và C là ứng dụng của dao động tắt dần.',
  },
  {
    id: 2,
    prompt:
      'Bộ phận phuộc nhún (giảm xóc) trên xe máy hay ô tô là một ứng dụng điển hình của loại dao động nào?',
    options: [
      { id: 'A', text: 'Dao động duy trì.' },
      {
        id: 'B',
        text: 'Dao động tự do không ma sát.',
      },
      {
        id: 'C',
        text: 'Dao động cưỡng bức ở trạng thái cộng hưởng.',
      },
      {
        id: 'D',
        text: 'Dao động tắt dần có ma sát lớn.',
      },
    ],
    answer: 'D',
    explanation:
      'Đúng! Bộ giảm xóc chứa lò xo và ống dầu có độ nhớt cao, tạo ra lực cản ma sát lớn. Khi xe đi qua chỗ xóc, dao động của khung xe sẽ tắt dần rất nhanh, giúp người ngồi trên xe không bị nẩy lên liên tục.',
  },
  {
    id: 3,
    prompt:
      "Khi một đội quân đi đều bước qua một chiếc cầu treo, chỉ huy thường ra lệnh 'bước tự do' (ngừng đi đều). Lý do vật lý cốt lõi của mệnh lệnh này là gì?",
    options: [
      {
        id: 'A',
        text: 'Tránh tạo ra ngoại lực tuần hoàn gây ra hiện tượng cộng hưởng làm sập cầu.',
      },
      {
        id: 'B',
        text: 'Để giảm tổng trọng lượng của đội quân tác dụng lên mặt cầu.',
      },
      {
        id: 'C',
        text: 'Giúp nhịp cầu thực hiện dao động duy trì ổn định.',
      },
      {
        id: 'D',
        text: 'Làm giảm lực ma sát trượt giữa đế giày và mặt cầu.',
      },
    ],
    answer: 'A',
    explanation:
      'Đúng! Nếu đội quân đi đều bước sẽ tạo ra một ngoại lực cưỡng bức tuần hoàn. Nếu vô tình tần số bước chân bằng với tần số dao động riêng của cầu, cộng hưởng sẽ xảy ra làm cầu dao động với biên độ cực đại, dẫn đến đứt cáp và sập cầu.',
  },
  {
    id: 4,
    prompt:
      'Trong máy đo địa chấn kiểu lò xo, để ghi nhận được chính xác dao động của mặt đất mà quả nặng vẫn đứng im làm điểm tựa, người ta đã lợi dụng tính chất vật lý nào?',
    options: [
      {
        id: 'A',
        text: 'Lực cản của không khí.',
      },
      {
        id: 'B',
        text: 'Tần số riêng của lò xo cực kỳ lớn.',
      },
      {
        id: 'C',
        text: 'Tính quán tính lớn do quả nặng có khối lượng lớn.',
      },
      {
        id: 'D',
        text: 'Trọng lực bị triệt tiêu hoàn toàn.',
      },
    ],
    answer: 'C',
    explanation:
      'Đúng! Định luật 1 Newton (định luật Quán tính) cho biết vật có khối lượng càng lớn thì quán tính càng cao. Quả nặng khối lượng lớn có xu hướng bảo toàn trạng thái đứng yên của nó dù khung máy và mặt đất bên dưới đang rung lắc.',
  },
  {
    id: 5,
    prompt:
      'Tại Đài Bắc 101 (Tòa nhà chọc trời ở Đài Loan), người ta treo một quả cầu thép khổng lồ nặng 660 tấn (Tuned Mass Damper) trên đỉnh tháp. Vai trò của quả cầu này liên quan đến kiến thức dao động nào?',
    options: [
      {
        id: 'A',
        text: 'Cung cấp năng lượng để duy trì dao động cho tòa nhà.',
      },
      {
        id: 'B',
        text: 'Hấp thụ năng lượng và dập tắt dần dao động lắc lư của tòa nhà khi có bão hoặc động đất.',
      },
      {
        id: 'C',
        text: 'Tạo ra hiện tượng cộng hưởng giúp tòa nhà đứng vững.',
      },
      {
        id: 'D',
        text: 'Quả cầu làm tòa nhà nặng hơn để tăng áp lực xuống móng.',
      },
    ],
    answer: 'B',
    explanation:
      'Đúng! Quả cầu này là một con lắc tắt dần khổng lồ. Khi bão hoặc động đất làm tòa nhà lắc sang một bên, quả cầu do quán tính sẽ có xu hướng lắc chậm hơn về hướng ngược lại. Các tay đòn thủy lực gắn vào nó sẽ tạo ma sát khổng lồ hấp thụ năng lượng, giúp dập tắt dao động của tòa nhà nhanh chóng.',
  },
]
