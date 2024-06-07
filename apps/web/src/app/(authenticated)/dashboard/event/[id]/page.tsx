import { notFound } from 'next/navigation';
import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import SingleEventPageComponent from '@/components/pages/dashboard/event/single';
import { getSelf } from '@/request/auth';
import { getEventRequest } from '@/request/event';

export default async function EventViewPage(props: { params: { id: string } }) {
  const id = props.params.id;
  const event = await getEventRequest(id);
  if (!event) return notFound();
  const self = await getSelf();
  const isOrganizer = self._id === event?.organization.userId;
  return (
    <DashboardPageWrapperComponent title={event.name}>
      <SingleEventPageComponent id={id} event={event} isOrganizer={isOrganizer} />
    </DashboardPageWrapperComponent>
  );
}
