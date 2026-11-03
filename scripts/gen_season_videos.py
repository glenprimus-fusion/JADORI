import os, sys, time, requests, subprocess
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")
KEY = os.environ["EMERGENT_LLM_KEY"]
# Fal Universal Key supports queue inference through Emergent proxy, not Platform APIs.
BASE = os.environ.get("INTEGRATION_PROXY_URL", "https://integrations.emergentagent.com").rstrip("/") + "/api/v1/fal"
EP = "fal-ai/kling-video/v2.5-turbo/pro/image-to-video"
IMG = "https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/"
STYLE = " Very slow, calm luxury fashion campaign film, locked-off camera with a barely perceptible slow push-in, natural film grain, no cuts, no text."
JOBS = {
    "winter": (IMG + "d3d2e41df094afa546ca2286586ee2183bf347870cd18ce73ac68681420a30c9.jpeg",
               "The woman in the camel coat stays in frame on the snowy Beacon Hill sidewalk, shifting her weight and glancing down the street, carrying the black quilted chain bag, light snow drifting softly, gas lamps glowing." + STYLE),
    "spring": (IMG + "eb387347dfaa8d659b45f965fe81d9d767e9f58b7ab0db6b38ef892e54959ce6.jpeg",
               "The woman in the ivory trench stands holding the ivory top-handle bag, gently turns her head, magnolia petals drift slowly in a soft breeze, blossoms sway." + STYLE),
    "summer": (IMG + "99095cf2401b51f82793d65f2eaefb2d3c68c034c4865e0d48ad7124f20e22f2.jpeg",
               "The woman in the linen dress stays in frame on the dune boardwalk, gently pausing and looking out to sea, carrying the woven leather tote, dress and dune grass moving in the warm sea breeze, golden late light." + STYLE),
}
H = {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}


def run(name):
    img, prompt = JOBS[name]
    r = requests.post(f"{BASE}/proxy", headers={**H, "X-Fal-Target-Url": f"https://queue.fal.run/{EP}"},
                      json={"image_url": img, "tail_image_url": img, "prompt": prompt, "duration": "5", "negative_prompt": "fast motion, camera shake, distortion, extra limbs, text, blur"}, timeout=60)
    r.raise_for_status()
    sub = r.json()
    deadline = time.time() + 900
    while time.time() < deadline:
        s = requests.get(sub["status_url"], headers=H, timeout=30).json()
        st = (s.get("status") or "").upper()
        if st in ("COMPLETED", "OK"):
            url = requests.get(sub["response_url"], headers=H, timeout=60).json()["video"]["url"]
            out = f"/app/scripts/{name}_raw.mp4"
            open(out, "wb").write(requests.get(url, timeout=120).content)
            return f"{name}: {out} {os.path.getsize(out)}"
        if st in ("FAILED", "ERROR", "CANCELLED", "CANCELED"):
            return f"{name}: FAILED {s}"
        time.sleep(5)
    return f"{name}: TIMEOUT"


if __name__ == "__main__":
    names = sys.argv[1:] or list(JOBS)
    with ThreadPoolExecutor(3) as ex:
        for res in ex.map(run, names):
            print(res, flush=True)
