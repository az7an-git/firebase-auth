import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserDoc } from "../utils/user.utils";
import { showToast } from "../utils/toast";
import { Input, Button, Alert } from "../components/auth/index";

export function Settings() {
  const { currentUser, userDoc, refreshUserDoc } = useAuth();
  const [fullName, setFullName] = useState(userDoc?.fullName ?? "");
  const [company, setCompany] = useState(userDoc?.company ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setError("");
      setSuccess("");
      setIsSaving(true);
      await updateUserDoc(currentUser.uid, {
        fullName: fullName.trim(),
        company: company.trim(),
      });
      await refreshUserDoc(currentUser.uid);
      setSuccess("Profile updated successfully!");
      showToast.success("Profile updated successfully!");
    } catch (err) {
      const errorMsg = err.message || "Failed to update profile";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={currentUser?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Company"
            placeholder="Where do you work?"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Button type="submit" variant="primary" size="md" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Account Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">User ID:</span>
            <span className="text-gray-800 font-mono text-xs">
              {currentUser?.uid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Role:</span>
            <span className="text-gray-800">{userDoc?.role || "user"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Onboarding Complete:</span>
            <span className="text-gray-800">
              {userDoc?.onboardingComplete ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
