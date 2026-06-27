import { useState } from 'react'
import peopleImage from '../assets/people.png'
import { text } from './pageTypes'

export function Page15ElderReview() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const displayRating = hoveredRating || rating

  return (
    <section
      aria-label="EL501 도우미 리뷰"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      {/* Top Bar */}
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <span>{text.appName}</span>
        <span>{text.elder}</span>
      </header>

      <div className="h-[60px]" />

      {/* Avatar */}
      <div className="mx-auto h-[108px] w-[108px] overflow-hidden rounded-full bg-[#e1f4e7]">
        <img src={peopleImage} alt="도우미" className="h-full w-full object-cover" />
      </div>

      <div className="h-[24px]" />

      {/* Heading */}
      <h1 className="text-[32px] font-bold leading-[1.28] text-[#071b11]">
        도우미는 어떠셨나요?
      </h1>
      <p className="mt-2 text-[18px] font-medium leading-[1.4] text-[#10251a]">
        별점으로 도우미를 평가해주세요
      </p>

      <div className="h-[36px]" />

      {/* Star Rating */}
      <div
        className="mx-auto flex w-[280px] items-center justify-center gap-2"
        role="radiogroup"
        aria-label="별점 선택"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star}점`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill={star <= displayRating ? '#FACC15' : '#D1D5DB'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Rating Text */}
      <p className="mt-4 text-[20px] font-bold text-[#087349]">
        {rating > 0 ? `${rating}점` : '\u00A0'}
      </p>

      <div className="h-[40px]" />

      {/* Review Textarea */}
      <textarea
        placeholder="도우미에게 한마디 남겨주세요 (선택)"
        aria-label="리뷰 작성"
        className="mx-auto block h-[100px] w-[312px] resize-none rounded-[16px] border-[1.4px] border-[#cadfca] bg-[#f4fbf6] px-5 py-4 text-[16px] font-medium text-[#10251a] placeholder-[#87a98e] outline-none focus:border-[#087349]"
      />

      <div className="h-[28px]" />

      {/* Submit Button */}
      <button
        type="button"
        onClick={() => { window.location.hash = '#/7' }}
        className="mx-auto flex h-[56px] w-[312px] items-center justify-center rounded-[16px] border-2 border-[#087349] bg-[#ddf7e8] text-[20px] font-bold text-[#075d3c] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        disabled={rating === 0}
      >
        리뷰 남기기
      </button>

      <button
        type="button"
        onClick={() => { window.location.hash = '#/7' }}
        className="mx-auto mt-3 flex h-[44px] w-[312px] items-center justify-center text-[16px] font-medium text-[#10251a] underline underline-offset-2"
      >
        건너뛰기
      </button>
    </section>
  )
}
