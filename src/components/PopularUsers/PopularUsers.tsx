"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/config";
import { NotebookPenIcon, TrendingUp, UserRound } from 'lucide-react';
import type { User } from "@/utils/interfaces";
import { Line } from "../Line";

interface PopularUsersProps {
  title: string;
  limit?: number
}

export default function PopularUsers(props: PopularUsersProps) {
  const [usersPopularData, setUsersPopularData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(limit: number | undefined) {
      setIsLoading(true);
      try {
        const response = await fetch(api + `/users/popular?limit=${limit ? limit : 5}`);
        const data = await response.json();
        setUsersPopularData(data);
      } catch (error) {
        console.error("Error fetching popular users:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData(props.limit);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 w-full px-2 sm:px-4 md:px-6">
      <h1 className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-azul-clarinho font-bold text-center">
        {props.title} <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </h1>

      <div className="w-full max-w-[445px] sm:max-w-[500px] md:max-w-[600px] bg-azul-grad rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-6 md:py-8">
            <div className="animate-pulse flex space-x-4 w-full max-w-md px-4">
              <div className="rounded-full bg-gray-200 h-10 w-10 flex-shrink-0"></div>
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : usersPopularData.length === 0 ? (
          <div className="text-center py-8 text-gray-500 px-4">
            No users available
          </div>
        ) : (
          <div className="">
            {usersPopularData.map((item, index) => (
              <div key={item._id || index}>
                  <div
                    
                   
                  >
                    <div className="flex items-center p-3 sm:p-4 md:p-5">
                      {/* User avatar */}
                      <div className="flex-shrink-0">
                        <div className="flex justify-center items-center text-sm sm:text-base md:text-lg font-medium bg-azul-medio w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full text-white shadow-sm">
                          {item.name && item.name[0]}
                        </div>
                      </div>
                  
                      {/* User info */}
                      <div className="ml-3 sm:ml-4 md:ml-5 flex-1 min-w-0">
                        <h2 className="font-bold text-sm sm:text-base md:text-lg truncate">
                          {item.name}
                        </h2>
                  
                        <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                          <span>
                            
                            {item.followersCount ? (
                                <div className="flex gap-2">
                                    {item.followersCount > 1 ? item.followersCount + ' Seguidores' : item.followersCount + ' Seguidor'}
                                    <UserRound className="text-red-600 w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                            ) : (
                                <>
                                    Não tem seguidores.
                                </>
                            )
                            }
                              
                          </span>
                          
                        </p>
                        <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                          <span>
                            
                            {item.reviewsCount ? (
                                <div className="flex gap-2">
                                    {item.reviewsCount > 1 ? item.reviewsCount + ' Reviews' : item.reviewsCount + ' Review'}
                                    <NotebookPenIcon className="text-azul-clarinho w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                            ) : (
                                <>
                                    Ainda sem reviews.
                                </>
                            )
                            }
                              
                          </span>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                   <Line />
              </div>
            ))}
             
          </div>
        )}
      </div>
    </div>
  );
}
