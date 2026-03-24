import os, zipfile, shutil, re

# ── Configuração ─────────────────────────────────────────────
VERCEL_URL   = 'https://usa-topglass.vercel.app'
THEME_NAME   = 'usa-topglass-v3'
CLIENT_NAME  = 'USA Top Glass'
PROJECT_PATH = 'E:/Pages Machine/USA TopGlass'
DIST         = f'{PROJECT_PATH}/dist'
THEME_DIR    = f'{DIST}/{THEME_NAME}'
WP_THEME     = f'/wp-content/themes/{THEME_NAME}'

# URL da página home do tema no WordPress (não usa front-page.php para não
# sobrepor o front page existente do site)
WP_HOME_URL  = '/usa-top-glass'

# Assets públicos no WordPress (logos, imagens, media) — sem dependência do Vercel
WP_UPLOADS_URL = 'https://pedrokunz.com.br/wp-content/uploads/public-usa-top-glass'

CSS_VARS = f"""<style>
:root {{
  --blue-deep:#1B4F8A;--blue-mid:#2E86C1;--blue-light:#EBF5FB;
  --chrome:#8A9BA8;--bg:#F8FAFB;--surface:#FFFFFF;
  --dark:#1A1A1A;--mid:#4A5568;--border:#E2E8F0;
  --font-display:'Sora',system-ui,sans-serif;
  --font-body:'Sora',system-ui,sans-serif;
}}
a{{text-decoration:none!important;}}
</style>
</head>"""

def process(html, tpl, is_homepage=False):
    """
    Transforma o HTML do build Astro num PHP para WordPress.

    is_homepage=True  → âncoras ficam como href="#section" (scroll na própria página)
    is_homepage=False → âncoras com secções inexistentes na página apontam para WP_HOME_URL
    """
    # Assets locais no tema (CSS + JS bundled)
    html = html.replace('/_astro/', f'{WP_THEME}/_astro/')
    # Assets estáticos (logos, ícones, imagens) — não afeta /wp-content/ já corrigido
    html = re.sub(r'src="/(?!wp-content/)', f'src="{WP_UPLOADS_URL}/', html)
    html = re.sub(r"src='/(?!wp-content/)", f"src='{WP_UPLOADS_URL}/", html)
    # Favicon (usa href= não src=)
    html = re.sub(r'href="/(?!wp-content/|#|usa-top-glass|gallery)([^"]*\.(svg|ico|png|webp)")',
                  lambda m: f'href="{WP_UPLOADS_URL}/{m.group(1)}', html)
    # Qualquer referência ao Vercel que ainda reste (URLs absolutas nos componentes React)
    html = html.replace(VERCEL_URL, WP_UPLOADS_URL)
    # Logo e link "Home" (href="/") → URL da home do tema
    html = html.replace('href="/"', f'href="{WP_HOME_URL}/"')
    html = html.replace("href='/'", f"href='{WP_HOME_URL}/'")
    # Âncoras de navegação
    if is_homepage:
        # Na home: href="/#section" → href="#section" (scroll na própria página)
        html = html.replace('href="/#', 'href="#')
    else:
        # Nas subpáginas: âncoras sem secção local → apontam para WP_HOME_URL
        page_ids = set(re.findall(r'\bid="([^"]+)"', html))
        def fix_anchor(m):
            anchor = m.group(1)
            if anchor not in page_ids:
                return f'href="{WP_HOME_URL}/#{anchor}"'
            return m.group(0)
        html = re.sub(r'href="#([^"]+)"', fix_anchor, html)
    # Injecta CSS variables antes de </head>
    html = html.replace('</head>', CSS_VARS, 1)
    return f'<?php /* Template Name: {tpl} */ ?>\n' + html

# ── Limpa e recria pasta do tema ─────────────────────────────
if os.path.exists(THEME_DIR):
    shutil.rmtree(THEME_DIR)
os.makedirs(THEME_DIR)

# ── style.css ────────────────────────────────────────────────
with open(f'{THEME_DIR}/style.css', 'w', newline='\n') as f:
    f.write(f"""/*
Theme Name: {CLIENT_NAME}
Description: Landing page {CLIENT_NAME}
Author: Pedro Kunz
Template: hello-elementor
Version: 3.0
*/
""")

# ── functions.php ────────────────────────────────────────────
with open(f'{THEME_DIR}/functions.php', 'w', newline='\n') as f:
    f.write(f"""<?php
add_action('wp_enqueue_scripts', function() {{
    wp_dequeue_style('hello-elementor-style');
    wp_dequeue_style('hello-elementor-theme-style');
}}, 20);

// Garante que o tipo MIME application/javascript é servido correctamente
add_filter('mime_types', function($mimes) {{
    $mimes['js'] = 'application/javascript';
    return $mimes;
}});
""")

# ── home-page.php (homepage do tema — NÃO sobrepõe o front page do WordPress)
with open(f'{DIST}/index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open(f'{THEME_DIR}/home-page.php', 'w', encoding='utf-8', newline='\n') as f:
    f.write(process(html, CLIENT_NAME, is_homepage=True))
print(f'  + home-page.php  (Template: {CLIENT_NAME})')

# ── Páginas extra (subpastas do dist/) ───────────────────────
extra_pages = []
for entry in os.scandir(DIST):
    if entry.is_dir() and not entry.name.startswith('_') and entry.name != THEME_NAME:
        page_html = os.path.join(entry.path, 'index.html')
        if os.path.exists(page_html):
            page_name     = entry.name
            template_name = f'{CLIENT_NAME} — {page_name.capitalize()}'
            php_file      = f'{page_name}-page.php'
            with open(page_html, 'r', encoding='utf-8') as f:
                html = f.read()
            with open(f'{THEME_DIR}/{php_file}', 'w', encoding='utf-8', newline='\n') as f:
                f.write(process(html, template_name, is_homepage=False))
            extra_pages.append(php_file)
            print(f'  + {php_file}  (Template: {template_name})')

# ── Copia pasta _astro/ e substitui URLs do Vercel nos JS ────
astro_src = f'{DIST}/_astro'
astro_dst = f'{THEME_DIR}/_astro'
if os.path.exists(astro_src):
    shutil.copytree(astro_src, astro_dst)
    # Substitui URLs do Vercel nos bundles JS — corrige React hydration
    js_fixed = 0
    for fname in os.listdir(astro_dst):
        if fname.endswith('.js'):
            fpath = os.path.join(astro_dst, fname)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            changed = False
            if VERCEL_URL in content:
                content = content.replace(VERCEL_URL, WP_UPLOADS_URL)
                changed = True
            # Paths relativos /gallery-medias/ nos bundles React
            if '"/media/gallery-medias/' in content or "'/media/gallery-medias/" in content:
                content = content.replace('"/media/gallery-medias/', f'"{WP_UPLOADS_URL}/gallery-medias/')
                content = content.replace("'/media/gallery-medias/", f"'{WP_UPLOADS_URL}/gallery-medias/")
                changed = True
            if changed:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                js_fixed += 1
    # Adiciona .htaccess para garantir MIME types correctos no Hostinger
    htaccess = os.path.join(astro_dst, '.htaccess')
    with open(htaccess, 'w', newline='\n') as f:
        f.write('<IfModule mod_mime.c>\n')
        f.write('    AddType application/javascript .js\n')
        f.write('    AddType text/css .css\n')
        f.write('</IfModule>\n')
        f.write('Header set Access-Control-Allow-Origin "*"\n')
    print(f'  + _astro/  ({len(os.listdir(astro_dst))} ficheiros, {js_fixed} JS corrigidos, .htaccess adicionado)')

# ── Zip ───────────────────────────────────────────────────────
zip_path  = f'{DIST}/{THEME_NAME}.zip'
php_files = ['home-page.php', 'functions.php', 'style.css'] + extra_pages

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for file in php_files:
        path = f'{THEME_DIR}/{file}'
        if os.path.exists(path):
            z.write(path, f'{THEME_NAME}/{file}')
    if os.path.exists(astro_dst):
        for root, dirs, files in os.walk(astro_dst):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, THEME_DIR)
                z.write(abs_path, f'{THEME_NAME}/{rel_path.replace(os.sep, "/")}')

size_kb = round(os.path.getsize(zip_path) / 1024)
print(f'\nZip criado: {THEME_NAME}.zip  ({size_kb}KB)')
print(f'Templates incluídos: {len(php_files)}')
