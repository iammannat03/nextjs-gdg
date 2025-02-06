"use client";

import Image from "next/image";
import Link from "next/link";
import { CarouselDemo } from "@/components/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PageTitle from "@/components/page-title";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-full">
      <section className="px-20 w-full">
        {/* Ad Banner Carousel */}
        <CarouselDemo />
      </section>
      <main className="p-6 md:p-10">
        <PageTitle title="Events" />
        {loading ? (
          <section className="p-6 md:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 20 }).map(
                (_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[300px] w-full"
                  />
                )
              )}
            </div>
          </section>
        ) : (
          <section className="mt-3">
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events.map((event) => (
                  <Link
                    key={event._id}
                    href={`/console/events/${event._id}`}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={300}
                          height={200}
                          className="w-full object-cover rounded-md"
                        />
                        {/* <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                          {event.venue}
                        </CardDescription> */}
                      </CardHeader>
                      <div className="flex h-full flex-col justify-between">
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <CardTitle>
                                {event.title}
                              </CardTitle>
                              {/* <p>
                                  {new Date(
                                    event.start_date
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  {new Date(
                                    event.end_date
                                  ).toLocaleDateString()}
                                </p> */}
                            </div>
                            {/* <div className="flex justify-between text-sm text-muted-foreground">
                                <p>{event.start_time}</p>
                                <p>{event.end_time}</p>
                              </div> */}
                            <p className="text-sm">
                              {event.desc}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          {/* <Link href={`events/${event.id}`}>
                              More info
                            </Link> */}
                          {/* <Link
                              href={`/events/edit/${event._id}`}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/events/delete/${event._id}`}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </Link> */}
                          <Button
                            onClick={() =>
                              router.push(
                                `/events/register/${event._id}`
                              )
                            }
                            className="w-full"
                          >
                            Register
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </main>
  );
}
