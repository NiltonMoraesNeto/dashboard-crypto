import { CryptoData } from "@/model/crypto-data-model";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  currentPage: number;
  itemsPerPage: number;
  coins: CryptoData[];
  setCurrentPage: (value: SetStateAction<number>) => void;
  totalPages: number;
}

export const PaginationCoinsTable: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  coins,
  setCurrentPage,
  totalPages,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6 flex justify-between">
      <span className="text-xs mt-3">
        {Math.min(currentPage * itemsPerPage, coins.length)}{" "}
        {t("pagination.of")} {coins.length} {t("pagination.coinsTotal")}
      </span>
      <span>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {(() => {
              const pages = [];
              const maxVisiblePages = 3;
              const halfVisible = Math.floor(maxVisiblePages / 2);

              if (totalPages <= maxVisiblePages) {
                // Se houver 3 páginas ou menos, mostre todas
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i);
                        }}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              } else {
                // Sempre mostre a primeira página
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                );

                // Adicione ellipsis se necessário
                if (currentPage > halfVisible + 2) {
                  pages.push(
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Adicione páginas ao redor da página atual
                const startPage = Math.max(2, currentPage - halfVisible);
                const endPage = Math.min(
                  totalPages - 1,
                  currentPage + halfVisible
                );

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i);
                        }}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Adicione ellipsis se necessário
                if (currentPage < totalPages - halfVisible - 1) {
                  pages.push(
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Sempre mostre a última página
                pages.push(
                  <PaginationItem key={totalPages}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === totalPages}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              return pages;
            })()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </span>
    </div>
  );
};
