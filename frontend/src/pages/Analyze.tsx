/**
 * WHAT: Placeholder for the upload/analyze page. Real upload + result
 * rendering (prediction, confidence, metadata, Grad-CAM) gets built in
 * Milestones 4-6.
 */
export default function Analyze() {
  return (
    <div className="min-h-screen bg-forensic-bg p-8">
      <h1 className="text-2xl font-semibold text-forensic-accent mb-4">Analyze Media</h1>
      <p className="text-slate-400">
        Upload UI arrives in Milestone 5, once the image inference API
        (Milestone 4) exists to send files to.
      </p>
    </div>
  )
}
