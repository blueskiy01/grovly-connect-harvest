interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  delay?: number;
}

const Testimonial = ({ quote, author, role, image, delay = 0 }: TestimonialProps) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img
        src={image}
        alt={author}
        className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
      />
      <p className="text-lg italic mb-4">{quote}</p>
      <p className="font-bold">{author}</p>
      <p className="text-sm text-charcoal-light">{role}</p>
    </div>
  );
};

export default Testimonial;