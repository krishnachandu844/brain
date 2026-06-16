import { Sparkles, Search, Tag } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className='py-20 max-w-6xl mx-auto px-2'>
      <div className='grid md:grid-cols-3 gap-6'>
        {[
          {
            icon: Sparkles,
            title: "Save in one click",
            body: "Paste any link from a supported platform — we'll detect the source automatically.",
          },
          {
            icon: Search,
            title: "Find anything fast",
            body: "Search across titles, descriptions, and tags from every platform at once.",
          },
          {
            icon: Tag,
            title: "Organize your way",
            body: "Filter by platform, tag, or recency. Build your own taxonomy.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className='bg-surface border border-border rounded-2xl p-6 shadow-sm'
          >
            <div className='size-10 rounded-xl bg-brand/10 text-brand grid place-items-center mb-4'>
              <f.icon className='size-5' />
            </div>
            <h3 className='font-display font-bold text-lg mb-2'>{f.title}</h3>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
