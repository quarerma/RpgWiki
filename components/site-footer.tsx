import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-6">
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          As imagens exibidas neste site são apenas para referência pessoal do
          universo. Não reivindico a propriedade de obras de terceiros. Se você
          é titular dos direitos e deseja a remoção de alguma imagem, entre em
          contato em{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="underline underline-offset-4 hover:text-foreground"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
