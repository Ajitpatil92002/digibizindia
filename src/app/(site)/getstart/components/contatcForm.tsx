import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { LoaderIcon, PlusSquareIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';

interface FormData {
    address?: string;
    phonenumbers?: string; // Array of phone numbers
    email?: string;
    instalink?: string;
    fblink?: string;
    otherslink: string[]; // Array of additional social media links
    timings?: string;
}

const ContactForm = ({ handleform, bizId }: { bizId: string, handleform: (bizId: string) => void },) => {
    const [formData, setFormData] = useState<FormData>({
        address: '',
        phonenumbers: "",
        email: '',
        instalink: '',
        fblink: '',
        otherslink: [''],
        timings: '',
    });
    const [isSubmitting, setisSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOthersChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newOthers = [...formData.otherslink];
        newOthers[index] = e.target.value;
        setFormData({
            ...formData,
            otherslink: newOthers,
        });
    };

    const addOtherField = () => {
        setFormData({
            ...formData,
            otherslink: [...formData.otherslink, ''],
        });
    }

    const removeOtherField = (index: number) => {
        setFormData({
            ...formData,
            otherslink: formData.otherslink.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setisSubmitting(true);
            const resp = await axios.post("/api/getstarted/", {
                bizId,
                ...formData
            });
            handleform(resp.data.data.bizId);
        } catch (error) {
            alert("error occurred");
        } finally {
            setisSubmitting(false);
        }
    };

    return (
        <div className="p-4 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <form
                onSubmit={handleSubmit}
                className="bg-background grid md:space-x-4 md:grid-cols-2 p-6 rounded-lg shadow-lg w-full max-w-2xl"
            >
                <h2 className="col-span-full text-2xl font-bold mb-6 text-center">Contact Information</h2>

                <div className="mb-4">
                    <label className="block">Address</label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        placeholder="123 Main St, Anytown USA"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Phone Numbers (Comma Separated)</label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="phonenumbers"
                        value={formData.phonenumbers}
                        onChange={handleChange}
                        placeholder="+1 (555) 555-5555"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Email</label>
                    <Input
                        disabled={isSubmitting}
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="info@example.com"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Instagram Link</label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="instalink"
                        value={formData.instalink || ''}
                        onChange={handleChange}
                        placeholder="https://instagram.com/yourprofile"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Facebook Link</label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="fblink"
                        value={formData.fblink || ''}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourprofile"
                    />
                </div>

                <div className="mb-6">
                    <label className="block">
                        <span>Other Social Links</span>
                        <Button
                            disabled={isSubmitting}
                            type="button"
                            onClick={addOtherField}
                            size={"icon"}
                        >
                            <PlusSquareIcon className='h-4 w-4 mx-2' />
                        </Button>
                    </label>
                    {formData.otherslink.map((link, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                            <Input
                                disabled={isSubmitting}
                                type="text"
                                value={link}
                                onChange={(e) => handleOthersChange(index, e)}
                                placeholder="https://example.com"
                            />
                            <Button
                                disabled={isSubmitting}
                                type="button"
                                size={"icon"}
                                variant={"destructive"}
                                onClick={() => removeOtherField(index)}
                            >
                                <TrashIcon className='h-4 w-4' />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block">Working Hours</label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="timings"
                        value={formData.timings || ''}
                        onChange={handleChange}
                        placeholder="Mon-Fri: 9am-5pm"
                    />
                </div>

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="col-span-full w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    {
                        isSubmitting && <LoaderIcon className='animate-spin h-4 w-4' />
                    }
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;
