interface PrivacySectionProps {
  showContactInfo: boolean;
  onShowContactInfoChange: (value: boolean) => void;
}

const PrivacySection = ({
  showContactInfo,
  onShowContactInfoChange,
}: PrivacySectionProps) => {
  return (
    <div className="md:col-span-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showContactInfo}
          onChange={(e) => onShowContactInfoChange(e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-gray-600">
          Make my contact information visible to other users
        </span>
      </label>
    </div>
  );
};

export default PrivacySection;