import Booking from '@/models/Booking';
import Product from '@/models/Product';
import Enquiry from '@/models/Enquiry';
import { json, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const GET = route(async (req) => {
  await requireAdmin(req);
  const [byStatus, totalBookings, totalProducts, outOfStock, newEnquiries, recentBookings, recentEnquiries, byAppliance] =
    await Promise.all([
      Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Booking.countDocuments(),
      Product.countDocuments(),
      Product.countDocuments({ $or: [{ available: false }, { stock: 0 }] }),
      Enquiry.countDocuments({ status: 'new' }),
      Booking.find().sort({ createdAt: -1 }).limit(6),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
      Booking.aggregate([{ $group: { _id: '$appliance', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    ]);

  const status = Object.fromEntries(byStatus.map((s) => [s._id, s.count]));
  return json({
    totalBookings,
    pendingBookings: status.pending || 0,
    contactedBookings: status.contacted || 0,
    confirmedBookings: (status.confirmed || 0) + (status.in_progress || 0),
    completedBookings: status.completed || 0,
    cancelledBookings: status.cancelled || 0,
    totalProducts,
    outOfStock,
    newEnquiries,
    recentBookings,
    recentEnquiries,
    byAppliance,
  });
});
